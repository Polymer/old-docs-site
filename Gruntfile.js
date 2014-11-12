/*
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

module.exports = function(grunt) {

  var EXCLUDE_DIRS_APIDOCS = [
    'docs',
    'polymer-home-page',
    'polymer-home-page-dev',
    'MutationObservers',
    'CustomElements',
    'HTMLImports',
    'NodeBind',
    'platform',
    'platform-dev',
    'polymer',
    'polymer-dev',
    'polymer-expressions',
    'PointerEvents',
    'PointerGestures',
    'ShadowDOM',
    'TemplatingBinding',
    'tools',
    'web-animations-js',
  ];

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    jekyllConfig: grunt.file.readYAML('_config.yml'),

    jekyll: {
      // options: {    // Universal options
      //         bundleExec: true,
      //         src : '<%= app %>'
      //       },
      build: {
      },
      serve: {
        options: {
          //port: '<%= jekyllConfig.server_port %>',
          watch: true
          //serve: true
        }
      }
    },

    vulcanize: {
      options: {
        strip: true,
        csp: true,
        inline: true
      },
      elements: {
        options: {
          excludes: {
            imports: [
              "polymer.html$"
            ]
          }
        },
        files: {
          'elements/common_elements.vulcanized.html': 'elements/common_elements.html',
          'elements/homepage_elements.vulcanized.html': 'elements/homepage_elements.html',
        }
      },
      samples: {
        files: {
          'samples/layout-elements/drawer-app.vulcanized.html': 'samples/layout-elements/drawer-app.html',
          'samples/layout-elements/header-app.vulcanized.html': 'samples/layout-elements/header-app.html',
          'samples/layout-elements/scaffold-app.vulcanized.html': 'samples/layout-elements/scaffold-app.html',
          'samples/layout-elements/toolbar-sample.vulcanized.html': 'samples/layout-elements/toolbar-sample.html'
        }
      }
    },

    watch: {
      elements: {
        files: ['elements/**/*.html'],
        tasks: ['vulcanize'],
        options: {
          spawn: false,
        }
      }
    },

    appengine: {
      options: {
        manageFlags: {
          oauth2: true
        },
        runFlags: {
          port: 3000,
          host: "0.0.0.0"
        }
      },
      frontend: {
        root: '.'
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          watch: true
        }
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 5
      },
      target1: [
        'vulcanize',
        'jekyll:serve',
        'appengine:run:frontend',
        'compass',
        'watch'
      ]
    }

  });

  // Plugin and grunt tasks.
  require('load-grunt-tasks')(grunt);

  // Default task
  // Task to run vulcanize, jekyll, app engine server, compass watch, vulcanize watch
  grunt.registerTask('default', ['concurrent']);

  // Task to run vulcanize and build the jekyll site
  grunt.registerTask('docs', ['vulcanize', 'jekyll:build']);
  
  // Task just for running the GAE dev server.
  grunt.registerTask('serve', ['appengine:run:frontend']);

  // Task to build and copy docs over to publishing repo.
  //grunt.registerTask('publish', ['jekyll:prod', 'copy:main']);
  
};
