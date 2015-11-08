## Polymer documentation site

https://www.polymer-project.org/

### Install

  git clone https://github.com/Polymer/docs
  cd docs
  npm install

### Making changes

Run the App Engine dev server:

    dev_appserver.py .

The site will be served from http://localhost:8080.

If you're not making changes to SASS files or elements, this is enough to see
changes when refreshing the page.

#### Watch files / live reload

If you also prefer to live reload the page when making changes, use the `watch`
task with `--reload`:

    gulp watch --reload

The site will be proxied to http://localhost:3000. Making changes will refresh
the browser tab.

Optional flags:

- `--reload`: refreshes the browser tab when changes are made
- `--open`: opens a new browser tab when `gulp watch` is started
