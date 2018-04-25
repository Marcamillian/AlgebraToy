/* eslint-disable */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();

gulp.task('default', ['styles', 'lint'] ,()=>{
  gulp.watch('sass/*.css', ['style']);
  gulp.watch('src/js/**.*js', ['lint']);

  browserSync.init({
    server:'./src/'
  })

});

gulp.task('styles', ()=>{
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist-gulp/css'))
});

gulp.task('lint', ()=>{
  return gulp.src(['src/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
});

/*

gulp.task('html', ()=>{
  gulp.src('src/*.html')
    .pipe()
})

*/