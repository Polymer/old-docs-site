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
    # e.g. "/0.5/oage.html /1.0/oage" -> {"/0.5/oage.html": "/1.0/oage")
    redirects = dict([(r.split()[0], r.split()[1]) for r in redirects])
  return redirects

def handle_404(req, resp, e):
  resp.set_status(404)
  resp.write('Oops! No pages here.')

def handle_500(req, resp, e):
  logging.exception(e)
  resp.set_status(500)
  #render(resp, '500.html')
  resp.write('Oops! There was an issue on our end.')

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

    # Add .html to construct template path.
    if not path.endswith('.html'):
      path += '.html'

    data = {
      # todo
    }

    render(self.response, path, data)

routes = [
  ('/(.*)', Site),
]

app = webapp2.WSGIApplication(routes, debug=IS_DEV)
app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500
