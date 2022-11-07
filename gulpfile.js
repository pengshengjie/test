const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('zip', function() {
    return gulp.src(['build/static*/**','build/index.html'])
        .pipe(zip('build-' + new Date().toISOString().slice(0, 10) +'.zip'))
        .pipe(gulp.dest('export'));
});