---
layout: default
type: start
shortname: Start
title: Getting the starter project
subtitle: Your first Polymer application
---

<style>
#download-button {
  background: #4285f4;
  color: #fff;
  font-size: 18px;
  fill: #fff;
}
#download-button:hover {
  background: #2a56c6;
}
#download-button::shadow paper-ripple {
  color: #fff;
}
.unquote-link {
  max-width: 360px;
}
.unquote-image {
  background-image: url(/images/tutorial/finished.png);
  background-size: cover;
  background-position: top;
  width: 360px;
  height: 320px;
  border: 1px solid black;
}
</style>


In this tutorial, you'll build a small {{site.project_title}} application -- a very basic client for a social networking service. The end result will look like this:

<figure layout vertical center>
  <a href="https://polymer-tut.appspot.com" layout horizontal class="unquote-link">
    <div class="unquote-image"></div>
  </a>
  <figcaption>
    Click screenshot for demo
  </figcaption>
</figure>

This project will introduce you to most of the key concepts in working with {{site.project_title}}. Don't worry if you don't understand everything. Each of the concepts presented here is described in detail in the {{site.project_title}} documentation.

## Before you start: getting the starter project

To get started, download the starter project. This starter project includes all of the {{site.project_title}} libraries and dependencies you'll need to get started.

<p layout horizontal center-justified>
  <a href="https://github.com/Polymer/polymer-tutorial/archive/master.zip">
    <paper-button id="download-button" raised onclick="downloadStarter()"><core-icon icon="file-download"></core-icon>Download Starter Project</paper-button>
  </a>
</p>

Unzip the starter project somewhere on your local drive.

The starter includes an initial version of the project you'll be working with. It also includes incremental versions of the project so you can check your work along the way.

While you're working, you'll need a basic HTTP server to serve your pages. If you have Python installed, you can run one of the following commands in the top level of the starter project.

Python 2.x:

    python -m SimpleHTTPServer

Python 3.x:

    python -m http.server

Test out the web server by loading the finished version of the project. For example:

-  [http://localhost:8000/finished/](http://localhost:8000/finished/)

URLs in this tutorial assume your local server is listening on port 8000.
If you're using a different port, substitute the port you're using.

**Note:** On Windows, Python's simple HTTP server may not provide the correct MIME type for SVG images.
If the images don't render, try a different web server.
{: .alert .alert-info }


<div horizontal layout end-justified class="stepnav">
<a href="step-1.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Step 1: Creating the app structure</paper-button>
</a>
</div>

