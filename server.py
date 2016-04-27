#!/usr/bin/env python

# Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
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

env = jinja2.Environment(
  loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
  extensions=['jinja2.ext.autoescape'],
  autoescape=True,
  trim_blocks=True,
  variable_start_string='{{{',
  variable_end_string='}}}')
# env.filters.update({
#   'is_list': lambda v: isinstance(v, list),
# })

REDIRECTS_FILE = 'redirects.yaml'
NAV_FILE = '%s/nav.yaml'
IS_DEV = os.environ.get('SERVER_SOFTWARE', '').startswith('Dev')

def render(out, template, data={}):
  try:
    t = env.get_template(template)
    out.write(t.render(data).encode('utf-8'))
  except jinja2.exceptions.TemplateNotFound as e:
    handle_404(None, out, None)

def read_redirects_file(filename):
  with open(filename, 'r') as f:
    redirects = yaml.load(f)
    # Break lines into dict.
    # e.g. "/0.5/page.html /1.0/page" -> {"/0.5/page.html": "/1.0/page")
    redirects = dict([(r.split()[0], r.split()[1]) for r in redirects])
  return redirects

def read_nav_file(filename, version):
  with open(filename, 'r') as f:
    nav = yaml.load(f)
  for one_section in nav:
    base_path = '/%s/%s/' % (version, one_section['path'])
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


def handle_404(req, resp, e):
  resp.set_status(404)
  resp.write('Oops! No pages here.')

def handle_500(req, resp, e):
  logging.exception(e)
  resp.set_status(500)
  #render(resp, '500.html')
  resp.write('Oops! There was an issue on our end.')


# class VersionHandler(http2push.PushHandler):

#   def get(self, version):
#     render(self.response, '/%s/index.html' % version)


class Site(http2push.PushHandler):

  def redirect_if_needed(self, path):
    redirects = memcache.get(REDIRECTS_FILE)
    if redirects is None or IS_DEV:
      redirects = read_redirects_file(REDIRECTS_FILE)
      memcache.add(REDIRECTS_FILE, redirects)

    if path in redirects:
      self.redirect(redirects.get(path), permanent=True)
      return True

    return False

  def nav_for_section(self, version, section):
    nav_file_for_version = NAV_FILE % version
    nav = memcache.get(nav_file_for_version)
    if nav is None or IS_DEV:
      nav = read_nav_file(nav_file_for_version, version)
      memcache.add(nav_file_for_version, nav)
    if nav:
      for one_section in nav:
        if one_section['path'] == section:
          return one_section['items']
    return None


  @http2push.push()
  def get(self, path):
    if self.redirect_if_needed(self.request.path):
      return

    # Root / serves index.html.
    # Folders server the index file (e.g. /docs/index.html -> /docs/).
    if not path or path.endswith('/'):
      path += 'index.html'
    # Remove index.html from URL.
    elif path.endswith('index'):
      path = path[:path.rfind('/') + 1]
      # TODO: preserve URL parameters and hash.
      return self.redirect('/' + path, permanent=True)
    # Make URLs pretty (e.g. /page.html -> /page)
    elif path.endswith('.html'):
      path = path[:-len('.html')]
      return self.redirect('/' + path, permanent=True)

    version = 'bad_version'
    nav = None
    match = re.match('([0-9]+\.[0-9]+)/([^/]+)', path)
    if match:
      version = match.group(1)
      section = match.group(2)
      nav = self.nav_for_section(version, section)

    # Add .html to construct template path.
    if not path.endswith('.html'):
      path += '.html'

    data = {
      'nav': nav,
      'polymer_version_dir': version
    }

    render(self.response, path, data)

routes = [
  # ('/(\d\.\d)/$', VersionHandler),
  ('/(.*)', Site),
]

app = webapp2.WSGIApplication(routes, debug=IS_DEV)
app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500
