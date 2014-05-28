npm install

./scripts/release.sh # update components, projects, etc.

# Install bower_components deps.
cd js
bower install
cd ..

grunt docs
