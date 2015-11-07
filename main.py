#!/usr/bin/env python

# Copyright 2015 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

__author__ = 'ericbidelman@chromium.org (Eric Bidelman)'

#import sys
#sys.path.insert(0, 'lib')

import logging
import os
import jinja2
import webapp2

from google.appengine.api import memcache
from google.appengine.ext.webapp import template
# import http2push.http2push as http2push

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


class Site(webapp2.RequestHandler):

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
