# -*- coding: utf-8 -*-
# Copyright 2015 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License")
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
#

import logging
import os
import re
import webapp2
import yaml

from google.appengine.api import app_identity
from google.appengine.api import memcache
from webapp2_extras.routes import RedirectRoute

def get_dirs(root='.'):
  a = re.compile(r'^\d.\d(\.\d)?$')
  return [x for x in os.listdir(root) if os.path.isdir(x) and a.match(x)]

def get_default_polymer_version():
  current_app_version = os.environ['CURRENT_VERSION_ID'].split('.')[0]

  default_version = memcache.get('default_version', namespace=current_app_version)
  if default_version is None:
    f = open('_config.yml', 'r')
    config = yaml.load(f)

    default_version = config.get('default_version')
    memcache.add('default_version', default_version, namespace=current_app_version)

  return default_version


class VersionHandler(webapp2.RequestHandler):

  def get(self, version=None):
    version_dir = get_default_polymer_version()
    if self.request.path.startswith('/latest'):
      path = self.request.path.replace('/latest', '/%s' % version_dir)
      return self.redirect('%s' % path)

    return self.redirect('/%s%s' % (version_dir, self.request.path))


routes = [
    RedirectRoute('/apps/topeka/', name='topeka',
        redirect_to='https://polymer-topeka.appspot.com/', strict_slash=True),
    RedirectRoute('/apps/designer/', name='designer',
        redirect_to='https://polymer-designer.appspot.com/', strict_slash=True),
    RedirectRoute('/tools/designer/', name='designer',
        redirect_to='https://polymer-designer.appspot.com/', strict_slash=True),
    RedirectRoute('/apps/polymer-tutorial/finished/', name='tutorial',
        redirect_to='https://polymer-tut.appspot.com/', strict_slash=True),
    RedirectRoute('/docs/elements/core-elements.html', name='core-elements',
        redirect_to='/docs/elements/', strict_slash=True),
    RedirectRoute('/docs/elements/paper-elements.html', name='paper-elements',
        redirect_to='/docs/elements/', strict_slash=True),
    ('/latest.*', VersionHandler),
    ('/docs/.*', VersionHandler),
    ('/resources/.*', VersionHandler),
    ('/platform/.*', VersionHandler),
    ('/$', VersionHandler),
]

app = webapp2.WSGIApplication(routes=routes, debug=False)
