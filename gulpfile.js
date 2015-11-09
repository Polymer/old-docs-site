/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var stylemod = require('gulp-style-modules');
var argv = require('yargs').argv;
var browserSync = require('browser-sync').create();
var del = require('del');
var merge = require('merge-stream');
var runSequence = require('run-sequence');

function minifyHtml() {
  return $.minifyHtml({quotes: true, empty: true, spare: true});
}

function uglifyJS() {
  return $.uglify({preserveComments: 'some'});
}

function license() {
  return $.license('BSD2', {
    organization: 'The Polymer Project Authors. All rights reserved.',
    tiny: true
  });
}

// reload is a noop unless '--reload' cmd line arg is specified.
var reload = function() {
  return new require('stream').PassThrough({objectMode: true});
}

if (argv.reload) {
  reload = browserSync.reload;
}

function createReloadServer(dir) {
  browserSync.init({
    notify: true,
    open: !!argv.open,
    proxy: 'localhost:8080' // proxy serving through app engine.
  });
}

// Autoprefix and minify CSS
gulp.task('styles', function() {
  var sassOpts = {
    precision: 10,
    outputStyle: 'expanded',
    onError: console.error.bind(console, 'Sass error:')
  };

  return gulp.src('app/sass/**/*.scss')
    .pipe($.changed('dist/css'))
    .pipe($.sass(sassOpts))
    .pipe($.autoprefixer(['last 2 versions', 'ios 8', 'Safari 8']))
    // .pipe(stylemod()) // Wrap CSS in Polymer style module
    .pipe(gulp.dest('app/css')) // Save unminimized css to dev directory.
    .pipe($.cssmin())
    .pipe(license())
    .pipe(gulp.dest('dist/css'))
});

// Optimize Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe($.changed('dist/images'))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'));
});

// // Minify html
// gulp.task('html', function() {
//   gulp.src('app/index.html')
//     //.pipe($.changed('dist/index.html'))
//     .pipe(minifyHtml())
//     .pipe(gulp.dest('dist'));
// });

// Lint JavaScript
gulp.task('jshint', function() {
  return gulp.src([
      'gruntfile.js',
      'app/js/**/*.js',
      'app/elements/**/*.js',
      'app/elements/**/*.html'
    ])
    .pipe($.changed('dist/js'))
    .pipe($.jshint.extract()) // Extract JS from .html files
    .pipe($.jshint({esnext: true}))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Vulcanize
gulp.task('vulcanize', function() {
  return gulp.src('app/elements/elements.html')
    .pipe($.changed('dist/elements'))
    .pipe($.vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe($.crisper()) // Separate HTML/JS into separate files.
    .pipe($.if('*.html', minifyHtml())) // Minify html output
    .pipe($.if('*.js', uglifyJS())) // Minify js output
    .pipe($.if('*.js', license()))
    .pipe(gulp.dest('dist/elements'));
});

// Copy over polyfills
gulp.task('copy', function() {
  var app = gulp.src([
      'app/*',
      '*.{py,yaml}',
      'humans.txt',
      'push_manifest.json'
    ], {nodir: true})
    .pipe(gulp.dest('dist'));

  var bower = gulp.src([
      'app/bower_components/webcomponentsjs/webcomponents*.js'
    ], {base: 'app/'})
    .pipe(gulp.dest('dist'));

  return merge(app, bower);
});

gulp.task('watch', function() {
  createReloadServer();

  gulp.watch('app/sass/**/*.scss', ['styles', reload]);
  gulp.watch('app/elements/**/*', ['vulcanize', reload]);
  gulp.watch(['app/{js,elements}/**/*.js'], ['jshint', reload]);
  gulp.watch(['templates/*.html', 'app/**/*.html']).on('change', reload);
});

// Clean up your mess!
gulp.task('clean', function(done) {
  del(['dist', 'app/css']).then(paths => {
    done();
  });
});

// Default task. Build the dest dir.
gulp.task('default', ['clean', 'jshint'], function(done) {
  runSequence(
    ['styles', 'images', /*'html',*/'vulcanize'],
    'copy',
    done);
});
