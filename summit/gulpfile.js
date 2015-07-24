/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Autoprefix and minify CSS
gulp.task('styles', ['clean'], function() {
  return gulp.src('app/styles/**/*.css')
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.cssmin())
    .pipe(gulp.dest('dist/styles'));
});

// Optimize Images
gulp.task('images', ['clean'], function () {
  return gulp.src('app/images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'));
});

// Minify html
gulp.task('html', ['clean'], function() {
  return gulp.src('app/index.html')
    .pipe($.minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    }))
    .pipe(gulp.dest('dist'))
});

// Vulcanize
gulp.task('vulcanize', ['clean'], function () {
  return gulp.src('app/elements.html')
    .pipe($.vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest('dist'));
});

// Copy over polyfills
gulp.task('copy', ['clean'], function() {
  return gulp.src('app/bower_components/webcomponentsjs/webcomponents-lite.min.js')
    .pipe(gulp.dest('dist/scripts'))
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist']));

// Default task, build dist dir
gulp.task('default', ['styles', 'images', 'html', 'vulcanize', 'copy']);
