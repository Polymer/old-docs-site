## Old Polymer documentation site

This site has been replaced by the following sites: 

* .  Polymer Project landing page & blog: [https://www.polymer-project.org/](https://www.polymer-project.org/) ([Repo: polymer-project.org](https://github.com/Polymer/polymer-project.org)).
* .  Polymer Library documentation: [https://polymer-library.polymer-project.org/](https://polymer-library.polymer-project.org/) ([Repo: polymer-library-docs](https://github.com/Polymer/polymer-library-docs)).

### Install

The documentation site runs in Google App Engine, using the App Engine Python standard environment. Before you start
you'll need the following prerequisites:

-   Python 2.7
-   [Google Cloud SDK](https://cloud.google.com/sdk/)
-   App Engine Python standard environment. Ensure this is installed by running the following command:

        gcloud components install app-engine-python
        
    Or, if you installed via apt:
    
        sudo apt-get install google-cloud-sdk-app-engine-python

Set up your repo:

    git clone https://github.com/Polymer/docs 
    cd docs
    npm install


### Running the site

The first time you run the site, run `gulp` to build the site in its entirety:

    gulp

Then start the App Engine dev server on `dist/app.yaml`:

    dev_appserver.py dist/

The site will be served from http://localhost:8080.

#### Making changes / watching files / live reload

If you're making changes use the `watch` task. Optionally add `--reload` to live
reload the tab when changes are saved.

    gulp watch --reload

The site will be served on http://localhost:3000. Making changes will refresh
the browser tab.

Optional flags:

- `--reload`: refreshes the browser tab when changes are made
- `--open`: opens a new browser tab when `gulp watch` is started

**Tip** - run `gulp help` to see the list of available gulp tasks.

### Run tests

Install [WebTest framework](http://webtest.pythonpaste.org/en/latest/):

    pip install WebTest

Then run:

    npm test

If your Google Cloud SDK isn't installed in `~/google-cloud-sdk`, set the `CLOUD_SDK` environment
variable to the path to the Cloud SDK:

    export CLOUD_SDK=~/cloud/google-cloud-sdk


### Deployment

Build and deploy version `YYY-MM-DD` of the site:

    gulp
    npm run deploy YYYY-MM-DD

