## Polymer documentation site

https://www.polymer-project.org/

### Install

  git clone https://github.com/Polymer/docs
  cd docs
  npm install

### Making changes

Run the App Engine dev server on `dist/app.yaml`:

    dev_appserver.py dist/

The site will be served from http://localhost:8080.

If you're not making changes to SASS, elements, or md files, this is enough to see
changes when refreshing pages.

#### Watch files / live reload

If you're authoring a markdown page or prefer to live reload the page when
making changes, use the `watch` task with `--reload`:

    gulp watch --reload

The site will be served on http://localhost:3000. Making changes will refresh
the browser tab.

Optional flags:

- `--reload`: refreshes the browser tab when changes are made
- `--open`: opens a new browser tab when `gulp watch` is started
