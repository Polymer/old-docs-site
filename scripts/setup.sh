npm install

mkdir polymer-all/projects; cd polymer-all/projects
../tools/bin/pull-all-projects.sh

cd ../..
mkdir components; cd components
../polymer-all/tools/bin/pull-all-polymer.sh
../polymer-all/tools/bin/pull-all-elements.sh

grunt docs
