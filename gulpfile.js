/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

'use strict';

let fs = require('fs');
let path = require('path');
let gulp = require('gulp');
let $ = require('gulp-load-plugins')();
let styleMod = require('gulp-style-modules');
let matter = require('gulp-gray-matter');
let argv = require('yargs').argv;
let browserSync = require('browser-sync').create();
let del = require('del');
let marked = require('marked');
let merge = require('merge-stream');
let runSequence = require('run-sequence');

let AUTOPREFIXER_BROWSERS = ['last 2 versions', 'ios 8', 'Safari 8'];

marked.setOptions({
  highlight: code => {
    return require('highlight.js').highlightAuto(code).value;
  }
});

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
let reload = function() {
  return new require('stream').PassThrough({objectMode: true});
}

if (argv.reload) {
  reload = browserSync.reload;
}

function createReloadServer() {
  browserSync.init({
    notify: true,
    open: !!argv.open,
    proxy: 'localhost:8080' // proxy serving through app engine.
  });
}

// Autoprefix and minify CSS
gulp.task('style', function() {
  let sassOpts = {
    precision: 10,
    outputStyle: 'expanded',
    onError: console.error.bind(console, 'Sass error:')
  };

  return gulp.src('app/sass/**/*.scss')
    .pipe($.changed('dist/css'))
    .pipe($.sass(sassOpts))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    // .pipe(styleMod()) // Wrap CSS in Polymer style module
    // .pipe(gulp.dest('app/css')) // Save unminimized css to dev directory.
    .pipe($.cssmin()) // Minify and add license
    .pipe(license())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('style:modules', function() {
  return gulp.src('node_modules/highlight.js/styles/github.css')
    .pipe($.rename({basename: 'syntax-color'}))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(styleMod({
      //filename: 'syntax-color',
      // moduleId: function(file) {
      //   return 'syntax-color';//path.basename(file.path, path.extname(file.path)) + '-css';
      // }
    }))
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

gulp.task('md', function() {
  return gulp.src(['*!README.md', 'app/docs/**/*.md'], {base: 'app/'})
    .pipe(matter(function(file) { // pull out front matter data.
      let data = file.data;
      data.file = file;
      data.content = marked(file.content); // Markdown -> HTML.
      data.title = data.title || '';

      $.util.replaceExtension(file, '.html'); // file.js

      let tmpl = fs.readFileSync('templates/page.template');
      let renderTemplate = $.util.template(tmpl);

      return renderTemplate(data);
    }))
    .pipe($.rename({extname: '.html'}))
    .pipe(gulp.dest('dist'));
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

gulp.task('js', ['jshint'], function() {
  return gulp.src(['app/js/**/*.js'])
    .pipe(uglifyJS()) // Minify js output
    .pipe(gulp.dest('dist/js'));
});

// Vulcanize
gulp.task('vulcanize', function() {
  return gulp.src('app/elements/elements.html')
    // .pipe($.changed('dist/elements'))
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
  let app = gulp.src([
      '*',
      'app/index.html',
      '!{README.md, package.json,gulpfile.js}',
    ], {nodir: true})
    .pipe(gulp.dest('dist'));

  let docs = gulp.src([
      'app/docs/**/*.html'
     ], {base: 'app/'})
    .pipe(gulp.dest('dist'));

  let gae = gulp.src([
      '{templates,lib}/**/*'
     ])
    .pipe(gulp.dest('dist'));

  let bower = gulp.src([
      'app/bower_components/webcomponentsjs/webcomponents*.js'
    ], {base: 'app/'})
    .pipe(gulp.dest('dist'));

  return merge(app, docs, gae, bower);
});

gulp.task('watch', function() {
  createReloadServer();
  gulp.watch('app/sass/**/*.scss', ['style', reload]);
  gulp.watch('app/elements/**/*', ['vulcanize', reload]);
  gulp.watch(['app/{js,elements}/**/*.js'], ['jshint', reload]);
  gulp.watch('app/**/*.md', ['md', reload]);
  gulp.watch(['templates/*.html', 'app/**/*.html'], ['copy', reload]);
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
    ['style', 'style:modules', 'images', 'vulcanize', 'js'],
    'copy', 'md',
    done);
});
