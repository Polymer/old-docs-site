module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jekyll: {
      server : {
        server: true,
        server_port: 4000,
        auto: true
      },
      dev: {
        safe: false,
        lsi: false,
        pygments: true
      },
      prod: {}
    },

    watch: { // for development run 'grunt watch'
      jekyll: {
        files: ['./*.html'],
        tasks: ['jekyll:dev']
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: '_site/', // set base for src matches.
          src: ['**'], // includes files and subdirs of cwd.
          dest: '../test.github.com2/'
        }]
      }
    }

  });

  // Plugin and grunt tasks.
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task. Run standard jekyll server.
  grunt.registerTask('default', 'jekyll:server');

  // Take to build and copy docs over to publishing repo.
  grunt.registerTask('publish', ['jekyll:prod', 'copy:main'])

};
