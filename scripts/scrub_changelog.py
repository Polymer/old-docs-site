# -*- coding: utf-8 -*-

# @license
# Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
# This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
# The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
# The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
# Code distributed by Google as part of the polymer project is also
# subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt

"""
This script does post-processing on the Polymer change log produced by git.
It scrubs out uncessary items like test updates, version bumps, README updates, etc.
"""

__author__ = 'ericbidelman@chromium.org (Eric Bidelman)'

import re
import sys
import getopt

def main():
  try:
    opts, args = getopt.getopt(sys.argv[1:], "h", ["help"])
  except getopt.error, msg:
    print msg
    print "For help use --help"
    sys.exit(2)

  # Process options
  for o, a in opts:
    if o in ("-h", "--help"):
      print __doc__
      sys.exit(0)

  if len(args) < 1:
    print 'No input file specified.'
    sys.exit(2)

  filename = args[0]
  
  try:
    with open(filename, 'r') as f:
      lines = f.readlines()
  except IOError, e:
    print e
    sys.exit(2)

  output_lines = []
  for l in lines:
    if re.search(r'release\s\d.\d.\d', l, re.IGNORECASE):
      continue
    if re.search(r'bump|cleanup|freshen|merge|README|test|typo', l, re.IGNORECASE):
      continue

    output_lines.append(l)

  with open(filename + '.out', 'w') as f:
    f.writelines(output_lines)

if __name__ == "__main__":
  main()