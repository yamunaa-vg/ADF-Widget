var gulp = require('gulp')
var clean = require('gulp-clean')
var ngAnnotate = require('gulp-ng-annotate')

gulp.task('clean', function () {
  return gulp.src('dist/', {read: false})
    .pipe(clean())
})

gulp.task('build', ['clean'], function () {
  return gulp.src('lib/angular-progress-pie.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('dist/'))
})

gulp.task('default', ['clean', 'build'])
