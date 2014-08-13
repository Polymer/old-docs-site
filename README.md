> 参与贡献中文文档翻译，请参看[Polymer 中文文档翻译必读指南](https://github.com/unbug/docs/blob/ZH/CONTRIBUTING-ZH.md)

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


<!-- ### Check out the documentation -->
### Checkout 文档

<!-- Checkout this repo: -->
Checkout 该代码库 (repo)：

    git clone https://github.com/Polymer/docs.git --recursive

<!-- Run the setup script: -->
运行下面的脚本：

    cd docs
    ./scripts/setup.sh

<!-- This will run `npm install`, pull down any external dependencies, and kickoff the `grunt` task. **Note:** these scripts can take some time to install. -->
这些脚本会运行 `npm install`，pull down 所有的外部依赖，并启动 `grunt` 任务。**注意：**脚本执行的时间会比较长。

<!-- During the setup process the `polymer-all/projects` directory is populated for you. Whenever the site is released you'll need to re-run `./scripts/release.sh` in order to refresh this and other directories. See the [Polymer release](#polymer-release) section for more details. -->
在安装过程中 `polymer-all/projects` 目录会展示于你。当网站发布的时候，你需要运行 `./scripts/release.sh` 来刷新包括这个目录在内的很多目录。详见 [Polymer 发布](#polymer-release)章节。

<!-- ## Making edits and previewing changes -->
## 编辑与预览

<!-- This repo (`Polymer/docs`) is where the documentation source files live. To make a change: -->
该代码库 (`Polymer/docs`) 就是文档的源代码。如果想对文档进行修改：

<!-- 1. Be sure to run `npm install` in your docs directory if it's a new checkout. -->
<!-- 2. Fire up the `grunt` task. This task runs a number of processes: a local app engine server, jekyll, compass, and vulcanize. The jekyll, compass, and vulcanize tasks will all watch for file changes and update the site if you make any edits. -->
<!-- **Note:** Jekyll generates the static site in a folder named `_site`. It can take some time for the docs to fully regenerate and be copied to the output folder...keep refreshing! -->
<!-- 3. Make your edits. -->
1. 新 checkout 之后请确保 在你的文档目录下运行 `npm install`。
2. 触发 `grunt` 任务。该任务会启动一系列的进程：一个本地的 app engine server、jekyll、compass 和 vulcanize。其中 jekyll、compass 和 vulcanize 任务将会监控文件的改变，你编辑的内容都会更新到网站上。**注意：** Jekyll 会在 `_site` 文件夹生成静态站点。重新生成完整的文档并输出到这里是比较花时间的……保持更新吧。
3. 开始编辑。

<!-- Once your changes look good, `git commit` them and push. -->
一旦你的改动看上去没问题了，就可以 `git commit` 并 push。

<!-- ## Releases: pushing the docs -->
## 发布：推送文档

<!-- **Note**: only project owners can publish the documentation. -->
**注意：**只有项目的拥有者才可以发布文档。

<!-- ### Preview locally -->
### 本地预览

<!-- It's a good idea to run `grunt docs` before pushing the docs, as it runs a number of grunt tasks. Verify things went well and preview your changes locally using the dev server. -->
推荐在推送文档之前运行 `grunt docs`，它会启动很多 grunt 任务。确认各方面都没有问题，并通过 dev server 预览你的本地改动。

<!-- ### Release -->
### 发布

<!-- When we push a new version of Polymer, the site should be updated to use it. In addition, the element reference and other projects will need updating. -->
当我们推送一个新版本 Polymer 时，网站应该随之更新。另外 element 索引等其它项目也需要更新。

<!-- To update polymer.js, the poyfills, components, projects, etc., run the following in the root of the docs directory: -->
在文档的根目录运行下面的命令，可以更新 polymer.js、polyfills、components、项目等：

    ./scripts/release.sh

<!-- Once these are updated, you need to update some versions for the docs: -->
一旦这些内容更新了，你就需要更新文档的一些版本信息：

<!-- - Increment the version in `app.yaml`; -->
<!-- - Update the Polymer release version in `_config.yml`. -->
<!-- - Add a link point link to the release notes in `changelog.md`. -->
- 增加 `app.yaml` 的版本号；
- 在 `_config.yml` 更新 Polymer 的发布版本号。
- 在 `changelog.md` 中新增一条更新日志的链接。

<!-- Build the docs: -->
构建文档：

    grunt docs
    
<!-- At this point, run the dev server with `grunt`, and preview things locally to make sure nothing is terribly broken after Polymer and the elements have been updated.  -->
务必在此时用 `grunt` 运行 dev server 在本地预览内容以确保万无一失。

<!-- Next, run the deploy script in the root of the `Polymer/docs` directory: -->
接下来，在 `Polymer/docs` 的根目录运行发布脚本：

    ./scripts/deploy_site.sh
    
<!-- This script builds the site, api docs, runs Vulcanizer over the imports, and deploys to App Engine.     -->
该脚本会构建站点、api 文档、对导入的内容运行 Vulcanizer 并部署到 App Engine。

<!-- Last thing is to switch the app version in the App Engine admin console. To make the docs live, hit up https://appengine.google.com/deployment?&app_id=s~polymer-project and select the version you just deployed. -->
最后一件事是在 App Engine admin console 切换 app 的版本。点击 https://appengine.google.com/deployment?&app_id=s~polymer-project 并选择你刚发布的版本，就可以让文档处在最新的状态。

[jekyll]: http://jekyllrb.com/
[grunt]: http://gruntjs.com/
