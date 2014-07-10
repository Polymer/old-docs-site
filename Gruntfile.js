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
        excludes: {
          imports: [
            "polymer.html$"
          ]
        },
        strip: true,
        csp: false,
        inline: true
      },
      build: {
        files: {
          'elements/common_elements.vulcanized.html': 'elements/common_elements.html'
        },
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
        logConcurrentOutput: true
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

  // Task to build and copy docs over to publishing repo.
  //grunt.registerTask('publish', ['jekyll:prod', 'copy:main']);
  
};
