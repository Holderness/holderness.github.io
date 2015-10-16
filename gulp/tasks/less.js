var gulp = require('gulp'),
    config = require('../config'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps');
    concat = require('gulp-concat');

gulp.task('less', function() {
  return gulp.src(config.less.src)
    .pipe(sourcemaps.init())
      .pipe(concat(config.less.filename))
      .pipe(less())
      .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.less.dest));
});
