#!/usr/bin/env python

# Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
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
import datetime

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
    self.app = app
    self.testapp = webtest.TestApp(app)
    self.testbed = testbed.Testbed()
    self.testbed.activate()
    self.testbed.init_memcache_stub()

  def tearDown(self):
    self.testbed.deactivate()

  def testMainHandler(self):
    resp = self.testapp.get('/')
    assert resp.status_code == 200
    assert resp.content_type == 'text/html'
    # assert 'rel=preload' in resp.headers['Link']

    resp = self.testapp.get('/2.0/')
    assert resp.status_code == 301
    resp = resp.maybe_follow()
    assert resp.status_code == 200
    assert resp.content_type == 'text/html'

  def test404(self):
    resp = self.testapp.get('/pagethatdoesnotexist', status=404)
    assert resp.status_code == 404

  def testIndexRedirects(self):
    expected_resp = self.testapp.get('/')

    self.__redirect_resolves('/1.0/index.html', expected_resp)
    self.__redirect_resolves('/1.0/index', expected_resp)

    expected_resp = self.testapp.get('/')
    self.__redirect_resolves('/2.0/index.html', expected_resp)
    self.__redirect_resolves('/2.0/index', expected_resp)

    expected_resp = self.testapp.get('/2.0/start/')
    self.__redirect_resolves('/2.0/start/index.html', expected_resp)

#  def testMarkdownAuthoring(self):
#    resp = self.testapp.get('/1.0/test')
#    assert resp.status_code == 200
#    assert resp.content_type == 'text/html'
#    # assert 'rel=preload' in resp.headers['Link']
#    self.assertRegexpMatches(resp.normal_body, '<title>Test markdown page')
#    self.assertRegexpMatches(resp.normal_body, '<details id="toc">')
#    self.assertRegexpMatches(resp.normal_body, '<pre><code class="lang-html">')

  def testRedirectFile(self):
    redirects = server.read_redirects_file(server.REDIRECTS_FILE)

    for start_url,dest_url in redirects['literal'].items():
      resp = self.testapp.get(start_url)
      assert resp.status_code == 301
      self.assertTrue(resp.location.endswith(dest_url))

  def __validateNavItem(self, item, indent, file):
    for field in ['title', 'path']:
      self.assertTrue(field in item, 'Section missing required field "%s". [%s]' % (field, file))
    if indent:
      self.assertTrue('indent' in item and item['indent'], 'Item in subsection missing indent: "%s". [%s]' % (item['title'], file))

  def __validateNavSection(self, section, file):
    for field in ['section', 'path', 'shortpath']:
      self.assertTrue(field in section, 'Section missing required field "%s". [%s]' % (field, file))
    in_subsection = False
    seen_one_subsection = False
    if 'items' in section:
      for item in section['items']:
        if 'header' in item:
          self.assertFalse(in_subsection, 'Header without previous endheader: "%s". [%s]' % (item['header'], file));
          in_subsection = True
          seen_one_subsection = True
        elif 'endheader' in item:
          in_subsection = False
        else:
          self.assertFalse(seen_one_subsection and not in_subsection, 'Orphan item between subsections: "%s". [%s]' % (item['title'], file))
          self.__validateNavItem(item, in_subsection, file)

  def testNavFiles(self):
    for version in [ '1.0', '2.0' ]:
      nav_file_for_version = server.NAV_FILE % version
      nav = server.read_nav_file(nav_file_for_version, version)
      self.assertTrue(len(nav) > 0)
      for section in nav:
        self.__validateNavSection(section, nav_file_for_version)

  def testArticlesFiles(self):
      articles = server.read_articles_file(server.ARTICLES_FILE, server.AUTHORS_FILE)
      for (index, article) in enumerate(articles):
        for field in ['title', 'path', 'published', 'author', 'description']:
          self.assertTrue(field in article, 'Article #%s missing required field "%s".' % (index, field))
          if field in article and type(article[field]) == str:
            self.assertFalse(article[field].strip() == "", 'Article #%s field "%s" is empty.' % (index, field))
        if 'path' in article:
          self.assertTrue(article['path'].startswith('/'), 'Article #%s "path" doesn\'t start with "/".' % index)
        if 'published' in article:
          self.assertTrue(type(article['published']) == datetime.date, 'Article %s "published" is not a date type.' % index)
        if 'author' in article:
          author = article['author']
          for field in ['full_name', 'profile_pic']:
            if (field in author):
              self.assertFalse(author[field].strip() == "", 'Article #%s: author field "%s" is empty.' % (index, field))
            else:
              self.fail('Article #%s: author missing required field "%s".' % (index, field))
              print yaml.dump(author)
          for key in author.keys():
            self.assertTrue(key in ['full_name', 'profile_pic', 'gplus', 'web', 'twitter', 'github'],
                       'Article #%s: unrecognized key in author data: %s.' % (index, key))


if __name__ == '__main__':
  unittest.main()
