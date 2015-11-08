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

from google.appengine.api import memcache
from google.appengine.ext.webapp import template
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


class Site(http2push.PushHandler):

  @http2push.push()
  def get(self, path):
    if not path: # / servers /index.html
      path = 'index.html'
    elif path.endswith('/'): # /docs/ serves /docs/index.html
      path += 'index.html'
    elif path.endswith('/index.html'): # Remove /index.html from URL.
      path = path[:path.rfind('/') + 1]
      # TODO: preserver URL parameters and hash.
      return self.redirect('/' + path, permanent=True)

    try:
      template = env.get_template('app/' + path)
    except jinja2.exceptions.TemplateNotFound as e:
      self.abort(404)

    data = {
      # todo
    }

    return self.response.write(template.render(data).encode('utf-8'))


def handle_404(request, response, exception):
  logging.exception(exception)
  response.write('Oops! I could swear this page was here!')
  response.set_status(404)

app = webapp2.WSGIApplication([
  ('/(.*)', Site)
], debug=True)

app.error_handlers[404] = handle_404
