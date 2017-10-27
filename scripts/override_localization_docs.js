const gulp = require('gulp');

const locale = require('../package.json').locale

gulp.src([
  `dist/_locales/${locale}/**/*.html`
], {base: `dist/_locales/${locale}`})
.pipe(gulp.dest('dist'));
