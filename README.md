<!-- Polymer docs are mostly in Markdown with some HTML. [Jekyll][jekyll] is used to generate the static HTML for the site. The output is generated into a folder called `_site` and served from Google App Engine. -->
Polymer 的文档基本是伴随着一些 HTML 的 Markdown。[Jekyll][jekyll] 是用来为站点生成静态 HTML 的。这些输出的内容会生成到 `_site` 文件夹，同时部署到 Google App Engine。

<!-- ## Prereqs and installation requirements -->
## 准备工作和安装须知

<!-- We use Jekyll 2.0+ and [Grunt][grunt] to generate the documentation, and compass to compile SASS to CSS. You'll need to install the requirements before working on the docs (these instructions assume [NPM is already installed](http://nodejs.org/download/)): -->
我们用 Jekyll 2.0+ 和 [Grunt][grunt] 来生成文档，用 compass 把 SASS 编译成 CSS。在撰写文档之前，你有必要把它们都安装好 (这些步骤假定 [NPM 已经安装好了](http://nodejs.org/download/))：

    gem install jekyll kramdown jekyll-page-hooks compass rouge
    npm install -g grunt-cli vulcanize

<!-- **Note:** If you receive permission warnings, you may need to run the above tasks with `sudo`. -->
**注意：**如果你在操作过程中遇到了权限警告 (permission warnings)，请在任务命令前加上 `sudo` 再执行。

<!-- You'll also need the App Engine SDK to run the dev_appserver and preview the docs locally. [Download the SDK](https://developers.google.com/appengine/downloads). -->
你还需要 App Engine SDK 来运行 dev_appserver 和在本地预览文档。[下载 SDK](https://developers.google.com/appengine/downloads)。


### Check out the documentation

Checkout this repo:

    git clone https://github.com/Polymer/docs.git --recursive

Run the setup script:

    cd docs
    ./scripts/setup.sh

This will run `npm install`, pull down any external dependencies, and kickoff the `grunt` task. **Note:** these scripts can take some time to install.

During the setup process the `polymer-all/projects` directory is populated for you. Whenever the site is released you'll need to re-run `./scripts/release.sh` in order to refresh this and other directories. See the [Polymer release](#polymer-release) section for more details.

## Making edits and previewing changes

This repo (`Polymer/docs`) is where the documentation source files live. To make a change:

1. Be sure to run `npm install` in your docs directory if it's a new checkout.
2. Fire up the `grunt` task. This task runs a number of processes: a local app engine server, jekyll, compass, and vulcanize. The jekyll, compass, and vulcanize tasks will all watch for file changes and update the site if you make any edits.
**Note:** Jekyll generates the static site in a folder named `_site`. It can take some time for the docs to fully regenerate and be copied to the output folder...keep refreshing!
3. Make your edits.

Once your changes look good, `git commit` them and push.

## Releases: pushing the docs

**Note**: only project owners can publish the documentation.

### Preview locally

It's a good idea to run `grunt docs` before pushing the docs, as it runs a number of grunt tasks. Verify things went well and preview your changes locally using the dev server.

### Release

When we push a new version of Polymer, the site should be updated to use it. In addition,
the element reference and other projects will need updating.

To update polymer.js, the poyfills, components, projects, etc., run the following in the root of the docs directory:

    ./scripts/release.sh

Once these are updated, you need to update some versions for the docs:

- Increment the version in `app.yaml`;
- Update the Polymer release version in `_config.yml`.
- Add a link point link to the release notes in `changelog.md`.

Build the docs:

    grunt docs
    
At this point, run the dev server with `grunt`, and preview things locally to make sure nothing is terribly
broken after Polymer and the elements have been updated. 

Next, run the deploy script in the root of the `Polymer/docs` directory:

    ./scripts/deploy_site.sh
    
This script builds the site, api docs, runs Vulcanizer over the imports, and deploys to App Engine.    

Last thing is to switch the app version in the App Engine admin console. To make the docs live, hit up https://appengine.google.com/deployment?&app_id=s~polymer-project and select the version you just deployed.

[jekyll]: http://jekyllrb.com/
[grunt]: http://gruntjs.com/
