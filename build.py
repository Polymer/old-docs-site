import urllib, urllib2
import json

from PIL import Image, ImageDraw
import StringIO

import webapp2

PLATFORMS_ALL = ['Mac', 'Linux', 'Win']


class BuildStatusHandler(webapp2.RequestHandler):

  def get_last_build(self, project, platform):
    url = 'http://build.chromium.org/p/client.polymer/json/builders/' + urllib.quote('%s %s' % (project, platform)) + '/builds/-1'
    return json.load(urllib2.urlopen(url))

  def last_build_is_successful(self, project, platform, browser):
    success = True
    build = self.get_last_build(project, platform)
    foundTest = False
    for step in build['steps']:
      if foundTest:
        if step['results'][0] != 0:
          if browser == 'all' or step['text'][0].find(browser) != -1:
            success = False
            break
      elif step['name'] == 'test':
        if step['results'][0] != 0:
          success = False
          break
        else:
          foundTest = True
    return success

  def get(self, project, platform='all', browser='all'):
    success = True
    if platform == 'all':
      for plat in PLATFORMS_ALL:
        if not self.last_build_is_successful(project, plat, browser):
          success = False
          break
    else:
      success = self.last_build_is_successful(project, platform, browser)

    if success:
      color = 'rgb(0, 169, 92)'
      status = 'passing'
    else:
      color = 'rgb(216, 68, 55)'
      status = 'failing'
    image = Image.new("RGBA", (120, 20))
    draw = ImageDraw.Draw(image)
    draw.polygon([(1, 1), (89, 1), (89, 19), (1, 19)], 'white', 'rgb(127, 127, 127)')
    draw.polygon([(37, 3), (87, 3), (87, 18), (37, 18)], color)
    draw.text((5, 5), 'build', 'rgb(127, 127, 127)')
    draw.text((41, 5), status, 'white')

    output = StringIO.StringIO()
    image.save(output, format="png")
    layer = output.getvalue()
    output.close()

    self.response.headers['Content-Type'] = 'image/png'
    self.response.write(layer)


application = webapp2.WSGIApplication([
  webapp2.Route('/build/<project>/status.png', BuildStatusHandler),
  webapp2.Route('/build/<project>/<platform>/status.png', BuildStatusHandler),
  webapp2.Route('/build/<project>/<platform>/<browser>/status.png', BuildStatusHandler),
], debug=False)
