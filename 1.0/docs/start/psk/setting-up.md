## Setup

1. Install [Node.js](https://nodejs.org/) (`node`) version 0.12 or above. 
   Node.js includes
   Node Package Manager (`npm`) by default. PSK uses `npm` to install and manage
   tooling.

2. Verify that you're running `node` version 0.12 or above and `npm` version 2.11
   or above.

       node -v
       v0.12.5

       npm -v
       2.12.2

3. Install Gulp and Bower.

       [sudo] npm install -g gulp bower

   Note: the `-g` flag installs Gulp and Bower globally, so you may need to 
   execute the script with sudo privileges. The reason they are installed
   globally is because some scripts expect 
   `gulp` and `bower` to be available from the command line. 

   [//]: # (discussion of the Git workflow)

4. Create a directory for your project. This guide uses the name `proj` for the 
   name of the directory. You can use whatever name you want, but when you see
   `proj`, you need to replace it with your name.

       mkdir proj

       cd proj

5. Initialize a Git repository.

       git init

6. Download the [latest PSK release][psk latest release url] and copy-paste 
   all of the files into your directory.

   [//]: # (if you copy-paste, you're going to miss all the dot files...)

   [//]: # provide link to Git-based workflow

7. Add and commit all of the files.

       git add .

