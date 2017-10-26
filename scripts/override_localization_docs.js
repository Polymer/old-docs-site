const gulp = require('gulp');

const local = 'ja'

gulp.src([
  `dist/_locales/${local}/**/*.html`
], {base: `dist/_locales/${local}`})
.pipe(gulp.dest('dist'));