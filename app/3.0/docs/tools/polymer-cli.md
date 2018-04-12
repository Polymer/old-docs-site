---
title: Polymer CLI
---

<!-- toc -->

<div>
{% include 'outdated.html' %}
</div>

Polymer CLI is the official command line tool for Polymer projects and Web Components. It includes 
a build pipeline, a boilerplate generator for creating elements and apps, a linter, a development
server, and a test runner.

Follow these instructions to install the Polymer CLI on a Linux or MacOS operating system. 

For a suggested way to run the Polymer CLI on Windows 10, see the instructions below on 
[Installing Polymer CLI pre-requisites on Windows 10](#windows-10). 

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

## Commands

See the documentation on [Polymer CLI commands](polymer-cli-commands) for a list of commands and
how to use them.

## Installing Polymer CLI pre-requisites on Windows 10 {#windows-10}

There are multiple ways to install the pre-requisites for the Polymer CLI on a Windows 10 system. 
This method uses Bash on the Windows Subsystem for Linux. 

For complete and up-to-date installation instructions for Bash on the Windows Subsystem for Linux, 
we recommend you review the [Bash on ubuntu on Windows documentation](https://msdn.microsoft.com/en-us/commandline/wsl/about). 

### Enable Bash on Windows 10 {#enable-bash}

1.  Check your OS build by selecting **Start** > **System** > **OS Build**. 
    
    Make sure you have an x64 installation of Windows 10 with OS build > 14393.
    
1.  Open **Settings** > **Update and Security** > **For developers** and select **Developer Mode**.

1.  From the **Start** Menu, search for **Turn Windows features on or off** and select **Windows 
Subsystem for Linux (beta)**. 

1.  Restart your computer. 

1.  Log in as Administrator. 

1.  From a PowerShell prompt, run the following command:
    
        Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux

1.  Open a Bash prompt:
    
        bash

6.  Follow the prompts to create a new user.

Your Bash installation is complete. You can start now start a new Bash prompt by typing `bash` from 
the Start menu.

### Install Node with nvm {#install-node}

For complete and up-to-date instructions, refer to the [official documentation for installing Node 
with nvm](https://github.com/creationix/nvm).

1.  Type the following command to use an install script:
    
        curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

2.  Restart your terminal by closing and re-opening your Bash prompt.

3.  Install the latest version of Node:

        nvm install node

### Optional: Set a default browser {#set-default-browser}

Optionally, set a default browser so `polymer serve --open` has something to open. Use your own 
Path variable.

    echo $'\n'export BROWSER=/mnt/c/Program\\\ Files\\\ \\\(x86\\\)/
    Google/Chrome/Application/chrome.exe >> ~/.bashrc
