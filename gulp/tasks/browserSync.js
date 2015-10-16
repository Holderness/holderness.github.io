var gulp = require('gulp'),
    browserSync = require('browser-sync').create();
    config = require('../config');

// Static server
gulp.task('browsersync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("../../*.html").on("change", browserSync.reload);
    gulp.watch(config.css.src, ['css-watch']);
    gulp.watch(config.js.src, ['js-watch']);
    gulp.watch(config.less.src, ['less-watch']);
});

gulp.task('js-watch', ['js'], function() {
  browserSync.reload();
});

gulp.task('css-watch', ['css'], function() {
  browserSync.reload();
});

gulp.task('less-watch', ['less'], function() {
  browserSync.reload();
});