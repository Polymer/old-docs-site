#!/usr/bin/env python

# Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
# This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
# The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
# The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
# Code distributed by Google as part of the polymer project is also
# subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt

__author__ = 'ericbidelman@chromium.org (Eric Bidelman)'

import re
import unittest
import urllib
import webapp2
import webtest
import yaml

from google.appengine.api import memcache
from google.appengine.ext import testbed

import server


class HandlerTest(unittest.TestCase):

  def __redirect_resolves(self, url, expected_resp):
    resp = self.testapp.get(url)
    self.assertFalse(resp.location.endswith(url), 'Final URL is not different')
    assert resp.status_int == 301
    resp = resp.maybe_follow()
    assert resp.status_int == 200
    self.assertEqual(expected_resp.normal_body, resp.normal_body,
                     'Redirect response was correct')
    return resp

  def setUp(self):
    app = webapp2.WSGIApplication([('/(.*)', server.Site)])
    self.testapp = webtest.TestApp(app)
    self.testbed = testbed.Testbed()
    self.testbed.activate()
    self.testbed.init_memcache_stub()

  def tearDown(self):
    self.testbed.deactivate()

  def testMainHandler(self):
    resp = self.testapp.get('/')
    assert resp.status_code == 301
    resp = resp.maybe_follow()
    assert resp.status_code == 200
    assert resp.content_type == 'text/html'
    assert 'rel=preload' in resp.headers['Link']

    resp = self.testapp.get('/1.0/')
    assert resp.status_code == 200
    assert resp.content_type == 'text/html'

    resp = self.testapp.get('/1.0/page.html')
    assert resp.status_code == 301
    self.assertTrue(resp.location.endswith('/1.0/page'))

  def test404(self):
    resp = self.testapp.get('/pagethatdoesnotexist', status=404)
    assert resp.status_code == 404

  def testIndexRedirects(self):
    expected_resp = self.testapp.get('/1.0/')

    self.__redirect_resolves('/index.html', expected_resp)
    self.__redirect_resolves('/index', expected_resp)

    expected_resp = self.testapp.get('/1.0/')
    self.__redirect_resolves('/1.0/index.html', expected_resp)
    self.__redirect_resolves('/1.0/index', expected_resp)

    expected_resp = self.testapp.get('/1.0/page')
    self.__redirect_resolves('/1.0/page.html', expected_resp)

  def testMarkdownAuthoring(self):
    resp = self.testapp.get('/1.0/test')
    assert resp.status_code == 200
    assert resp.content_type == 'text/html'
    assert 'rel=preload' in resp.headers['Link']
    self.assertRegexpMatches(resp.normal_body, '<title>Test markdown page')
    self.assertRegexpMatches(resp.normal_body, '<details id="toc">')
    self.assertRegexpMatches(resp.normal_body, '<pre><code class="lang-html">')

  def testRedirectFile(self):
    redirects = server.read_redirects_file(server.REDIRECTS_FILE)

    for start_url,dest_url in redirects.items():
      resp = self.testapp.get(start_url)
      assert resp.status_code == 301
      self.assertTrue(resp.location.endswith(dest_url))

if __name__ == '__main__':
  unittest.main()
