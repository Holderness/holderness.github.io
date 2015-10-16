var gulp = require('gulp'),
    config = require('../config'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps');
    concat = require('gulp-concat');

var LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({ advanced: true }),
    autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

gulp.task('less', function() {
  return gulp.src(config.less.src)
    .pipe(sourcemaps.init())
      // .pipe(concat(config.less.filename))
      .pipe(less({
        plugins: [autoprefix, cleancss]
      }))
      .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.less.dest));
});
