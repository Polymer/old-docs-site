---
title: Polymer CLI
---

<!-- toc -->

Polymer CLI is the official command line tool for Polymer projects and Web Components. It includes 
a build pipeline, a boilerplate generator for creating elements and apps, a linter, a development
server, and a test runner.

## Install Polymer CLI {#install}

1.  Make sure you have installed a version of Node.js supported by Polymer. To check the version
    of Node.js that you have installed, run:
    
        node --version
    
    See the [official node version support policy](node-support) for more details.

1.  Update npm.

        npm install npm@latest -g

1.  Ensure that Git is installed.

        git --version

    If it isn't, you can find it on the [Git downloads page](https://git-scm.com/downloads).

1.  Install the latest version of Bower.

        npm install -g bower

1.  Install Polymer CLI.

        npm install -g polymer-cli

    **Bower deprecation warning:** In the output from this command, you may see an npm warning
    about Bower being deprecated. You can safely ignore this warning. See [Bower.io](https://bower.io/blog/)
    for more information.
    {.alert .alert-info}

You're all set. Run `polymer help` to view a list of commands.

## CLI project types {#project-types}

Polymer CLI works with two types of projects:

* Elements projects. In an element project, you expose a single element or group of related 
  elements which you intend to use in other element or app projects, or distribute on a registry 
  like Bower or NPM. Elements are reusable and organized to be used alongside other elements, so 
  components are referenced outside the project.
  
  See the guide to [creating an element project with the Polymer CLI](create-element-polymer-cli)
  for more information.

* Application projects. In an app project, you build an application, composed of Polymer elements, 
  which you intend to deploy as a website. Applications are self-contained, organized with 
  components inside the application.
  
  See the guide to [creating an application project with the Polymer CLI](create-app-polymer-cli)
  for more information.

## Running Polymer on Windows 10

To get started with polymer on windows 10 there are multiple solution. This one is using Windows Subsystem for Linux "Bash on Ubuntu on Windows". If you already have a performant solution with an up to date node/npm feel free to skip these steps.

### Enable Bash on Windows 10 {#enabled-bash}

We recommend you look at [the official install guide](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide).

But in short
1. Make sure you have an x64 installation with OS Build > 14393
2. Turn on Developer Mode
	- Open Settings -> Update and Security -> For developers
	- Select the Developer Mode radio button
3. Enable the Windows Subsystem for Linux feature (GUI)
	- From Start, search for "Turn Windows features on or off" (type 'turn')
	- Select Windows Subsystem for Linux (beta)
	- Restart!
4. Open a PowerShell prompt as administrator and run:
    ```bash
    Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
    ```
5. Open a command prompt
    ```bash
    bash
    ```
6. Follow on screen instruction and create a new user
7. Enjoy Bash (From Start, search for "Bash on Ubuntu on Windows" (type 'bash')

### Setup node with nvm {#setup-node}

Again feel free to follow the [official documentation](https://github.com/creationix/nvm)

1. Use Install Script
    ```bash
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
    ```
2. Restart your Terminal (e.g. close Bash for Windows and reopen it)
3. Install latest Node
    ```bash
    nvm install node
    ```
4. Enjoy the latest node & npm

### Additional Recommended Setup {#should-do}
1. Set default browser so "polymer serve --open" has something to open (use your own Path!!)
    ```bash
    echo $'\n'export BROWSER=/mnt/c/Program\\\ Files\\\ \\\(x86\\\)/Google/Chrome/Application/chrome.exe >> ~/.bashrc
    ```


## Commands

See the documentation on [Polymer CLI commands](polymer-cli-commands) for a list of commands and
how to use them.