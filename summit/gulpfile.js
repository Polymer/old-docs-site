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
var merge = require('merge-stream');
var $ = require('gulp-load-plugins')();
var del = require('del');

// Autoprefix and minify CSS
gulp.task('styles', ['clean'], function() {
  return gulp.src('app/styles/**/*.css')
    // No matter what setting I use it seems to add -webkit-box which breaks
    // the logo :(
    // .pipe($.autoprefixer(['last 2 versions', 'ios 8', 'Safari 8']))
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
  gulp.src('app/index.html')
    .pipe($.minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    }))
    .pipe(gulp.dest('dist'));
});

// Vulcanize
gulp.task('vulcanize', ['clean'], function () {
  return gulp.src('app/src/elements.html')
    .pipe($.vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest('dist/src'));
});

// Copy over polyfills
gulp.task('copy', ['clean'], function() {
  var polyfills = gulp.src('app/bower_components/webcomponentsjs/webcomponents-lite.min.js')
    .pipe(gulp.dest('dist/bower_components/webcomponentsjs'));
  var router = gulp.src('app/bower_components/page/*.js')
    .pipe(gulp.dest('dist/bower_components/page'));
  var data = gulp.src('app/data/*.json')
    .pipe(gulp.dest('dist/data'));
  var CoC = gulp.src('app/code-of-conduct.html')
    .pipe(gulp.dest('dist'));
  var codelabs = gulp.src('app/codelabs.html')
    .pipe(gulp.dest('dist'));
  return merge(polyfills, router, data, CoC, codelabs);
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist']));

// Default task, build dist dir
gulp.task('default', ['styles', 'images', 'html', 'vulcanize', 'copy']);
