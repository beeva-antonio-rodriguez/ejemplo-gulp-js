var gulp = require('gulp'),
  htmlmin = require('gulp-htmlmin'),
  sass = require('gulp-sass'),
  cssnano = require('gulp-cssnano'),
  jshint = require("gulp-jshint"),
  uglify = require("gulp-uglify"),
  imagemin = require('gulp-imagemin'),
  del = require('del');


gulp.task('html', function () {
  return gulp.src('./src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('jshint', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('scripts', ['jshint'], function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('images', function() {
  return gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('clean', function() {
  return del(['./dist']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('html', 'styles', 'scripts', 'images');
});


gulp.task('watch', ['default'], function() {
  gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/scss/**/*.scss', ['styles']);
  gulp.watch('./src/js/**/*.js', ['scripts']);
  gulp.watch('./src/img/**/*', ['images']);
});