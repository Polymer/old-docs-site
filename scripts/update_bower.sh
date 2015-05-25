#!/bin/bash
#
#
#
component_dirs="0.5 0.9 0.9/samples"

for dir in $component_dirs
do 
  ( cd $dir ; bower update )
done

