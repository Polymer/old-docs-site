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
#COMPONENTS_DIR=../../components
COMPONENTS_DIR=../../../

# Update submodules =====
echo "=== Updating: submodules ==="
git submodule foreach git pull origin master

# Update site's bower_components deps. These get installed to /js/bower_components.
bower update

# Update projects folder =====
#cd $PROJECTS_DIR
#echo "=== Updating projects ==="
#../tools/bin/pull-all-projects.sh

# Update components and polyfills folder =====
#cd $COMPONENTS_DIR
echo "=== Updating: components, polymer, polyfills, projects, and labs ==="

# TODO(nevir): pull-all doesn't actually pull *everything* any more; the extra
# args until polymer-* components are fully deprecated and the docs no longer
#use them.
./polymer-all/tools/bin/pull-all.sh ./polymer-all/tools/repo-configs/deprecated.json ./polymer-all/tools-private/paper.json
rm -rf polymer-all/projects/
mv projects/ polymer-all/
cp -R js/bower_components/highlightjs/ components/highlightjs

# Update designer =====
cd $DESIGNER_DIR
echo "=== Updating designer ==="
rm -rf components # If bower components dir exists, script hangs. Remove it first.
bower install
