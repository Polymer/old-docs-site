#!/usr/bin/env python

# Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
# This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
# The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
# The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
# Code distributed by Google as part of the polymer project is also
# subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt

__author__ = 'ericbidelman@chromium.org (Eric Bidelman)'

import sys
sys.path.insert(0, 'lib')

import logging
import os
import jinja2
import webapp2
import yaml
import re
import json

from google.appengine.api import memcache
import http2push.http2push as http2push


jinja_loader = jinja2.FileSystemLoader(os.path.dirname(__file__))
env = jinja2.Environment(
  loader=jinja_loader,
  extensions=['jinja2.ext.autoescape'],
  autoescape=True,
  trim_blocks=True,
  variable_start_string='{{{',
  variable_end_string='}}}')

# memcache logic: maintain a separate cache for each explicit
# app version, so staged versions of the docs can have new nav
# structures, redirects without affecting other deployed docs.

# CURRENT_VERSION_ID format is version.hash, where version is the
# app version passed to the deploy script.
MEMCACHE_PREFIX = 'no_version/'
if 'CURRENT_VERSION_ID' in os.environ:
  MEMCACHE_PREFIX = os.environ.get('CURRENT_VERSION_ID').split('.')[0] + '/'

REDIRECTS_FILE = 'redirects.yaml'
NAV_FILE = '%s/nav.yaml'
ARTICLES_FILE = 'blog.yaml'
AUTHORS_FILE = 'authors.yaml'
IS_DEV = os.environ.get('SERVER_SOFTWARE', '').startswith('Dev')

# base path for edit-on-github links
BASE_EDIT_PATH = "https://github.com/Polymer/docs/edit/master/app/%s.md"

def render(out, template, data={}):
  try:
    t = env.get_template(template)
    out.write(t.render(data).encode('utf-8'))
  except jinja2.exceptions.TemplateNotFound as e:
    handle_404(None, out, data, e)
  except Exception as e:
    handle_500(None, out, data, e)

def load_yaml_config(filename):
  try:
    with open(filename) as f:
      config = yaml.load(f)
      if config is None:
        logging.warning("No config data in %s." % filename)
      return config
  except IOError:
    logging.error("Error: Couldn't load file %s." % filename, exc_info=True)
  except yaml.YAMLError, exc:
    logging.error("Error: parsing %s." % filename, exc_info=True)

def read_redirects_file(filename):
  redirects = load_yaml_config(filename)
  literals = {}
  wildcards = {}
  # Break lines into dict.
  # e.g. "/0.5/page.html /1.0/page" -> {"/0.5/page.html": "/1.0/page")
  # If the redirect path ends with *, treat it as a wildcard.
  # e.g. "/0.5/* /1.0/" redirects "/0.5/foo/bar" to "/1.0/foo/bar"
  for r in redirects:
    parts = r.split()
    if parts[0].endswith('*'):
      wildcards[parts[0][:-1]] = parts[1]
    else:
      literals[parts[0]] = parts[1]
  return {'literal': literals, 'wildcard': wildcards}

def read_nav_file(filename, version):
  nav = load_yaml_config(filename)
  for one_section in nav:
    one_section['version'] = version
    base_path = '/%s/%s/' % (version, one_section['shortpath'])
    if 'items' in one_section:
        for link in one_section['items']:
          if 'path' in link:
            # turn boolean flag into an additional CSS class.
            if 'indent' in link and link['indent']:
              link['indent'] = 'indent'
            else:
              link['indent'] = ''
            if not 'name' in link:
              if link['path'].startswith(base_path):
                link['name'] = link['path'].replace(base_path, '')
              else:
                link['name'] = 'index'
  return nav

def read_articles_file(articlefile, authorfile):
  articles = load_yaml_config(articlefile)
  authors = load_yaml_config(authorfile)

  # For each article, smoosh in the author details.
  for article in articles:
    if 'author' in article and article['author'] in authors:
      article['author'] = authors[article['author']];
    else:
      logging.warning('Missing author info for %s.' % article['title'])
  return articles

def handle_404(req, resp, data, e):
  resp.set_status(404)
  render(resp, '/404.html', data)

def handle_500(req, resp, data, e):
  logging.exception(e)
  resp.set_status(500)
  render(resp, '/500.html', data)


class SearchHandler(http2push.PushHandler):

  def get(self):
    self.redirect(str('https://www.google.com/search?q=site%3Apolymer-project.org+' + self.request.get('q')))


class Site(http2push.PushHandler):

  def redirect_if_needed(self, path):
    redirect_cache = MEMCACHE_PREFIX + REDIRECTS_FILE
    redirects = memcache.get(redirect_cache)
    if redirects is None or IS_DEV:
      redirects = read_redirects_file(REDIRECTS_FILE)
      memcache.add(redirect_cache, redirects)

    literals = redirects.get('literal')
    if path in literals:
      self.redirect(literals.get(path), permanent=True)
      return True

    wildcards = redirects.get('wildcard')
    for prefix in wildcards:
      if path.startswith(prefix):
        self.redirect(path.replace(prefix, wildcards.get(prefix)), permanent=True)
        return True

    return False

  def get_site_nav(self, version):
    nav_file_for_version = NAV_FILE % version
    nav_cache = MEMCACHE_PREFIX + nav_file_for_version
    site_nav = memcache.get(nav_cache)
    if site_nav is None or IS_DEV:
      site_nav = read_nav_file(nav_file_for_version, version)
      memcache.add(nav_cache, site_nav)
    return site_nav

  def get_section_nav(self, version, shortpath):
    site_nav = self.get_site_nav(version)
    if site_nav:
      for section in site_nav:
        if section['shortpath'] == shortpath:
          if 'items' in section:
            return section['items']
    return None

  def get_versioned_paths(self, shortpath):
    site_nav_1 = self.get_site_nav('1.0')
    site_nav_2 = self.get_site_nav('2.0')
    site_nav_3 = self.get_site_nav('3.0')
    versioned_paths = ['','','']
    if site_nav_1:
      for section in site_nav_1:
        if section['shortpath'] == shortpath:
          versioned_paths[0] = section['path']
          break
    if site_nav_2:
      for section in site_nav_2:
        if section['shortpath'] == shortpath:
          versioned_paths[1] = section['path']
          break
    if site_nav_3:
      for section in site_nav_3:
        if section['shortpath'] == shortpath:
          versioned_paths[2] = section['path']
          break
    return versioned_paths

  def get_articles(self):
    articles_cache = MEMCACHE_PREFIX + ARTICLES_FILE
    articles = memcache.get(articles_cache)

    if articles is None or IS_DEV:
      articles = read_articles_file(ARTICLES_FILE, AUTHORS_FILE)
      memcache.add(articles_cache, articles)

    return articles

  def get_active_article(self, articles, path):
    # Find the article that matches this path
    fixed_path = '/' + path
    for article in articles:
      if article['path'] == fixed_path:
        return article
    return None

  @http2push.push()
  def get(self, path):
    if self.redirect_if_needed(self.request.path):
      return

    template_path = path
    # edit_on_github_path is different for index files.
    edit_on_github_path = path
    # Root / serves index.html.
    # Folders server the index file (e.g. /docs/index.html -> /docs/).
    if not path or path.endswith('/'):
      template_path += 'index.html'
      edit_on_github_path += 'index'
    # Remove index.html from URL.
    elif path.endswith('index'):
      # TODO: preserve URL parameters and hash.
      return self.redirect('/' + path[:path.rfind('/') + 1], permanent=True)
    # Make URLs pretty (e.g. /page.html -> /page)
    elif path.endswith('.html'):
      return self.redirect('/' + path[:-len('.html')], permanent=True)

    match = re.match('([0-9]+\.[0-9]+)/([^/]+)', path)

    if match:
      version = match.group(1)
      shortpath = match.group(2)

      data = {
        'site_nav': self.get_site_nav(version),
        'section_nav': self.get_section_nav(version, shortpath),
        'path': '/' + path,
        # API docs are not editable in GH.
        'edit_on_github': path.find('.0/docs/api/') == -1,
        'edit_on_github_path': BASE_EDIT_PATH % edit_on_github_path,
        'versioned_paths': self.get_versioned_paths(shortpath),
        # we use this as a macro in cross-references.
        # please don't take it away.
        'polymer_version_dir': version
      }
    else:
      articles = None
      active_article = None

      if template_path.startswith('blog') or template_path == 'index.html':
        articles = self.get_articles()
        active_article = self.get_active_article(articles, template_path)

      data = {
        'site_nav': self.get_site_nav('1.0') + self.get_site_nav('2.0') + self.get_site_nav('3.0'),
        'articles': articles,
        'active_article': active_article
      }

    # Add .html to construct template path.
    if not template_path.endswith('.html'):
      template_path += '.html'

    render(self.response, template_path, data)

routes = [
  ('/search/', SearchHandler),
  ('/(.*)', Site),
]

app = webapp2.WSGIApplication(routes, debug=IS_DEV)
app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500
