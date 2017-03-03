#!/bin/sh

# Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
# This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
# The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
# The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
# Code distributed by Google as part of the polymer project is also
# subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt

deployVersion=$1

if [ -z "$deployVersion" ]
then
  echo "App version not specified."
  echo "Usage: npm run deploy 2015-11-08"
  exit 0
fi

readonly APPDIR=$(dirname $BASH_SOURCE)

echo "\nBuilding app version: $deployVersion\n"
gulp

echo "Deploying app version: $deployVersion"
gcloud app deploy $APPDIR/../dist/app.yaml \
    --project polymer-project --version $deployVersion --no-promote
