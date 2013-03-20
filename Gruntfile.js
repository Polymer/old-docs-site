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
          dest: '<%= jekyllConfig.destination %>'
        }]
      }
    }

  });

  // Plugin and grunt tasks.
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task. Run standard jekyll server.
  grunt.registerTask('default', ['jekyll:server']);

  // Task to build docs.
  grunt.registerTask('docs', ['jekyll:prod']);

  // Task to build and copy docs over to publishing repo.
  grunt.registerTask('publish', ['jekyll:prod', 'copy:main']);
};
