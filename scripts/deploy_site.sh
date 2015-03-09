#!/bin/bash
#
# Builds Polymer's API documentation and upload's the site to app engine.
# 
# Note: This script should be used in place of using appcfg.py update directly
# to update the application on App Engine.
#
# Copyright 2013 Eric Bidelman <@ebidel>

# for arg in $@
# do
#  if [ $arg = "--release" ] ; then
#    versionStr=v`date +%Y%m%d`
   
#    git checkout -b $versionStr

#    if [ $? -ne 0 ] ; then
#      git checkout $versionStr
#      git merge master
#      git commit -m "merging with master"
#    else
#      # Change app.yaml version to current date timestamp.
#      fl=../app.yaml
#      mv $fl $fl.old
#      sed "s/version: master/version: $versionStr/g" $fl.old > $fl
#      rm -f $fl.old

#      # Commit the new release branch.
#      git commit -m "Cutting release $versionStr" ../app.yaml
#    fi

#    git push origin $versionStr
#  fi
# done

# Vulcanize common elements for the site
#node polymer-all/labs/vulcanize/bin/vulcanize -i _includes/common_elements.html -o elements/common_elements.vulcanized.html 
#vulcanize --config vulcanize_config.json _includes/common_elements.html -o elements/common_elements.vulcanized.html

# Compile .sass files.
compass compile

# Run jekyll and build api docs.
grunt docs

# Deploy site to App Engine.
appcfg.py update --oauth2 .
