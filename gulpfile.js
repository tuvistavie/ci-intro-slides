var gulp          = require('gulp')
var jade          = require('gulp-jade')
var stylus        = require('gulp-stylus')
var connect       = require('connect')
var path          = require('path')
var http          = require('http')
var serveStatic   = require('serve-static')
var livereload    = require('gulp-livereload')


var dev = process.env.NODE_ENV !== 'production'

gulp.task('jade', function () {
  return gulp.src('./src/index.jade')
    .pipe(jade({pretty: dev}))
    .pipe(gulp.dest('./build'))
    .pipe(livereload())
})

gulp.task('stylus', function () {
  return gulp.src('./src/css/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build/css'))
    .pipe(livereload())
})

gulp.task('watch', function(arg) {
  gulp.watch('./src/images/*', ['copy:images'])
  gulp.watch('./src/**/*.jade', ['jade'])
  gulp.watch('./src/css/**/*.styl', ['stylus'])
})

gulp.task('copy:images', function(arg) {
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./build/images'))
    .pipe(livereload())
})

gulp.task('livereload', function () {
  livereload.listen()
})

gulp.task('connect', function () {
  var app = connect()
  app.use(serveStatic(path.resolve('./build')))
  http.createServer(app).listen(7050)
})

gulp.task('build', ['jade', 'stylus', 'copy:images'])
gulp.task('dev', ['build', 'watch', 'connect', 'livereload'])
gulp.task('default', ['dev'])
