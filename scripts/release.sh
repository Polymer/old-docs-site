#!/bin/bash
#
# Preps a release. Updates submodules, components, polyfills, and projects.
#
# Note: run from the root of the docs folder.
#
# Copyright 2014 Eric Bidelman <@ebidel>


# SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

PROJECTS_DIR=./polymer-all/projects
DESIGNER_DIR=$PROJECTS_DIR/designer
TOPEKA_DIR=../topeka
TUTORIAL_DIR=../polymer-tutorial/finished
#COMPONENTS_DIR=../../components
#COMPONENTS_DIR=../../../

# Update submodules =====
echo "=== Updating: submodules ==="
git submodule foreach git pull origin master

# Update site's bower_components deps. These get installed to /js/bower_components.
bower update

# Update components and polyfills folder =====
echo "=== Updating: components, polymer, polyfills, projects, and labs ==="

./polymer-all/tools/bin/pull-all.sh ./polymer-all/tools/repo-configs/deprecated.json ./scripts/website.json
rm -rf polymer-all/projects/
mv projects/ polymer-all/
cp -R js/bower_components/highlightjs/ components/highlightjs
cp -R js/bower_components/marked/ components/marked
cp -R js/bower_components/plunker-button/ components/plunker-button
cp -R js/bower_components/native-promise-only/ components/native-promise-only

# Update topeka =====
cd js/bower_components/topeka
bower install --config.directory=components
vulcanize --inline --strip index.html -o build.html
rm -rf components # cleanup
cd ../../../
rm -rf polymer-all/projects/topeka/
mv js/bower_components/topeka ./polymer-all/projects/

# Update designer =====
cd $DESIGNER_DIR
echo "=== Updating designer ==="
rm -rf components # If bower components dir exists, script hangs. Remove it first.
bower install

## Update topeka =====
#cd $TOPEKA_DIR
#echo "=== Updating Topeka ==="
#rm -rf components # If bower components dir exists, script hangs. Remove it first.
#bower install
#vulcanize --inline --strip index.html -o build.html
#rm -rf components # cleanup

# Update tutorial
cd $TUTORIAL_DIR
echo "=== Updating tutorial ==="
vulcanize --inline --strip index.html -o build.html

