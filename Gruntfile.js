'use strict';
module.exports = function (grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    // setting folder templates
    dirs: {
      css: 'assets/css',
      less: 'assets/less',
      images: 'assets/images',
      js: 'assets/js',
    },

    // Compile all .less files.
    less: {
      // one to one
      development: {
        files: {
          '<%= dirs.css %>/frontend.css': '<%= dirs.less %>/frontend.less',
          '<%= dirs.css %>/print.css': '<%= dirs.less %>/print.less',
          '<%= dirs.css %>/admin.css': '<%= dirs.less %>/admin.less',
        },
      },
    },

    // Generate POT files.
    makepot: {
      target: {
        options: {
          exclude: ['build/.*'],
          domainPath: '/languages/', // Where to save the POT file.
          potFilename: 'wedocs.pot', // Name of the POT file.
          type: 'wp-plugin', // Type of project (wp-plugin or wp-theme).
          potHeaders: {
            'report-msgid-bugs-to':
              'https://wordpress.org/support/plugin/wedocs',
            'language-team': 'LANGUAGE <EMAIL@ADDRESS>',
          },
        },
      },
    },

    watch: {
      less: {
        files: ['<%= dirs.less %>/*.less'],
        tasks: ['less:development'],
        options: {
          livereload: true,
        },
      },
    },
  });

  // Load NPM tasks to be used here
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-wp-i18n');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', ['makepot']);
};
