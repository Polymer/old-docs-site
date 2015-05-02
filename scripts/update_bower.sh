#!/bin/bash
#
#
#
component_dirs="0.5 0.8 0.8/samples"

for dir in $component_dirs
do 
  ( cd $dir ; bower update )
done

