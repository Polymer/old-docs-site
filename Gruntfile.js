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

    // jekyll: {
    //       server : {
    //         server: true,
    //         server_port: '<%= jekyllConfig.server_port %>',
    //         auto: true
    //       },
    //       dev: {
    //         server: false,
    //         safe: false
    //       },
    //       prod: {
    //         auto: false,
    //         server: false
    //       }
    //     },

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

    // watch: { // for development run 'grunt watch'
    //   jekyll: {
    //     files: ['./*.html', '!**/node_modules/**', '!**/polymer-all/**', '!**/components/**'],
    //     tasks: ['jekyll:dev']
    //   }
    // },

    yuidoc: {
      polymeruielements: {
        //name: '<%= pkg.name %>',
        //description: '<%= pkg.description %>',
        //version: '<%= pkg.version %>',
        //url: '<%= pkg.homepage %>',
        options: {
          exclude: EXCLUDE_DIRS_APIDOCS.join(','),
          extension: '.js,.html',
          paths: './components/',
          outdir: './components/docs/',
          linkNatives: 'true',
          tabtospace: 2,
          themedir: 'doc_themes/footstrap'
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
        // inline: true
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
        },
      },
    },

    appengine: {
      options: {
        manageFlags: {
          oauth2: true
        },
        runFlags: {
          port: 3000
        }
      },
      frontend: {
        root: '.'
      }
    }

  });

  // Plugin and grunt tasks.
  require('load-grunt-tasks')(grunt);

  // Default task. Run standard jekyll server.
  grunt.registerTask('default', ['jekyll:serve']);

  grunt.registerTask('apidocs', ['yuidoc:polymeruielements']);

  grunt.registerTask('serve', ['appengine:run:frontend']);

  // Task to build docs.
  grunt.registerTask('docs', ['apidocs', 'vulcanize:build', 'jekyll:build']);

  // Task to build and copy docs over to publishing repo.
  //grunt.registerTask('publish', ['jekyll:prod', 'copy:main']);
};
