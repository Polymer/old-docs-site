#!/bin/bash
#
#
#
component_dirs="0.5 1.0 summit"

for dir in $component_dirs
do
  ( cd $dir ; bower update )
done
