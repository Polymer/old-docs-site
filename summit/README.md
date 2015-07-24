# Summit

## Setup

Build the summit site

```
cd summit
npm install && bower install
gulp
```

Then start the local server

```
cd ..
grunt docs
grunt
```

Then preview at localhost:3000/summit

## Deploying

Follow the above steps to build the summit site.
Update the version in `app.yaml` and deploy the entire Polymer site
as usual.
