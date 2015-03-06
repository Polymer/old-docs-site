/*
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

module.exports = function(grunt) {

  // List of version directories to vulcanize.
  var POLYMER_VERSIONS = [
    '0.5'
  ];

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    jekyllConfig: grunt.file.readYAML('_config.yml'),
    polymerVersion: null,

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
          '<%= polymerVersion %>/elements/common_elements.vulcanized.html': '<%= polymerVersion %>/elements/common_elements.html',
          '<%= polymerVersion %>/elements/homepage_elements.vulcanized.html': '<%= polymerVersion %>/elements/homepage_elements.html',
        }
      },
      samples: {
        files: {
          '<%= polymerVersion %>/samples/layout-elements/drawer-app.vulcanized.html': '<%= polymerVersion %>/samples/layout-elements/drawer-app.html',
          '<%= polymerVersion %>/samples/layout-elements/header-app.vulcanized.html': '<%= polymerVersion %>/samples/layout-elements/header-app.html',
          '<%= polymerVersion %>/samples/layout-elements/scaffold-app.vulcanized.html': '<%= polymerVersion %>/samples/layout-elements/scaffold-app.html',
          '<%= polymerVersion %>/samples/layout-elements/toolbar-sample.vulcanized.html': '<%= polymerVersion %>/samples/layout-elements/toolbar-sample.html'
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
        'vulcanize-elements',
        'jekyll:serve',
        'appengine:run:frontend',
        'compass',
        'watch'
      ]
    },

    doc_merge: {
      default: {
        options: {
          prefix: ['core', 'paper'],
          merge: true
        },
        src: '<%= polymerVersion %>/components',
        dest: '_data/versions/<%= polymerDataVersion %>/elements'
      }
    }

  });

  // Plugin and grunt tasks.
  require('load-grunt-tasks')(grunt);

  // Default task
  // Task to run vulcanize, jekyll, app engine server, compass watch, vulcanize watch
  grunt.registerTask('default', ['concurrent']);

  grunt.task.registerTask('vulcanize-elements', 'Vulcanizes site elements', function() {
    POLYMER_VERSIONS.forEach(function(ver) {
      grunt.config.set('polymerVersion', ver);
      grunt.task.run('vulcanize');
    });
  });

  grunt.task.registerTask('doc-merge-all', 'Doc merge all element sets', function() {
    POLYMER_VERSIONS.forEach(function(ver) {
      grunt.config.set('polymerVersion', ver);
      // Replace version 0.5 with 0_5 because the _data folder
      // can't have directories with dots in their name
      grunt.config.set('polymerDataVersion', ver.replace('.', '_'));
      grunt.task.run('doc_merge');
    });
  });

  // Task to run vulcanize and build the jekyll site
  grunt.registerTask('docs', ['doc-merge-all', 'vulcanize-elements', 'jekyll:build']);

  // Task just for running the GAE dev server.
  grunt.registerTask('serve', ['appengine:run:frontend']);

  // Task to build and copy docs over to publishing repo.
  //grunt.registerTask('publish', ['jekyll:prod', 'copy:main']);

};
