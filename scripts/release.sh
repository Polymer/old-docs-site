#!/bin/bash
#
# Preps a release. Updates submodules, components, polyfills, and projects.
#
# Note: run from the root of the docs folder.
#
# Copyright 2014 Eric Bidelman <@ebidel>


# SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

PROJECTS_DIR=./polymer-all/projects
COMPONENTS_DIR=../../components

# Update submodules =====
echo "=== Updating: submodules ==="
git submodule foreach git pull origin master

# Update projects folder =====
#cd $PROJECTS_DIR
#echo "=== Updating projects ==="
#../tools/bin/pull-all-projects.sh

# Update components and polyfills folder =====
#cd $COMPONENTS_DIR
echo "=== Updating: components, polymer, polyfills, projects, and labs ==="
#../polymer-all/tools/bin/pull-all.sh
./polymer-all/tools/bin/pull-all.sh
rm -rf polymer-all/projects/
mv projects/ polymer-all/
