Toolkitchen docs are mostly in Markdown with some HTML. [Jekyll][1] generates the HTML site from the source, which is then pushed (manually, for now) to the "gh-pages" branch. To publish a change to the live site, you would follow this basic process:

1. Checkout master and make desired changes.
2. Build docs locally with Jekyll, and verify changes. The generated site is placed in a folder named "_site".
3. Push the generated site (the contents of the _site folder) to the "gh-pages" branch. 
4. Push the source file changes to "master".

I've checked in my _config.yml file, which causes Jekyll to serve the generated site from http://localhost:4000. It also watches for changes to the source files and rebuilds the site, so you can just hit reload a few seconds after saving your changes.

Eventually, the process will be much simpler: The doc source files will be in the gh-pages branch, you will push your changes there, and the site will be rebuilt immediately by Github. At the moment, the Jekyll process on GitHub is failing to build the site, presumably because it doesn't like something about the source files. For now, however, it's a bit of a manual process.

[1]: https://github.com/mojombo/jekyll