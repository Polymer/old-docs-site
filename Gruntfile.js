module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    jekyllConfig: grunt.file.readYAML('_config.yml'),

    jekyll: {
      server : {
        server: true,
        server_port: '<%= jekyllConfig.server_port %>',
        auto: true
      },
      dev: {
        server: false,
        safe: false
      },
      prod: {
        auto: false,
        server: false
      }
    },

    watch: { // for development run 'grunt watch'
      jekyll: {
        files: ['./*.html', '!**/node_modules/**', '!**/polymer-all/**'],
        tasks: ['jekyll:dev']
      }
    },

    yuidoc: {
      polymeruielements: {
        //name: '<%= pkg.name %>',
        //description: '<%= pkg.description %>',
        //version: '<%= pkg.version %>',
        //url: '<%= pkg.homepage %>',
        options: {
          exclude: 'docs',
          extension: '.js,.html',
          paths: './polymer-all/polymer-ui-elements/',
          outdir: './polymer-all/polymer-ui-elements/docs/',
          linkNatives: 'true',
          tabtospace: 2,
          themedir: 'doc_themes/footstrap'
        }
      },
      polymerelements: {
        options: {
          exclude: 'docs',
          extension: '.js,.html',
          paths: './polymer-all/polymer-elements/',
          outdir: './polymer-all/polymer-elements/docs/',
          linkNatives: 'true',
          tabtospace: 2,
          themedir: 'doc_themes/footstrap'
        }
      }
    }

    // copy: {
    //   main: {
    //     files: [{
    //       expand: true,
    //       cwd: '_site/', // set base for src matches.
    //       src: ['**'], // includes files and subdirs of cwd.
    //       dest: '<%= jekyllConfig.publish_dir %>'
    //     }]
    //   }
    // }

  });

  // Plugin and grunt tasks.
  grunt.loadNpmTasks('grunt-jekyll');
  //grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  // Default task. Run standard jekyll server.
  grunt.registerTask('default', ['jekyll:server']);

  grunt.registerTask('apidocs', ['yuidoc:polymerelements',
                                 'yuidoc:polymeruielements']);

  // Task to build docs.
  grunt.registerTask('docs', ['jekyll:prod', 'apidocs']);

  // Task to build and copy docs over to publishing repo.
  //grunt.registerTask('publish', ['jekyll:prod', 'copy:main']);
};
