/* eslint-disable */

// https://www.viget.com/articles/gulp-browserify-starter-faq/ used for browserify js task


const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const babel = require('gulp-babel')
const babelify = require('babelify')

gulp.task('default', ['lint','html' ,'styles', 'js'] ,()=>{
  
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/js/*.js', ['lint', 'js']);
  gulp.watch('./src/sass/*.css', ['style']);
  
  browserSync.init({
    server:'./dist-gulp/'
  })
  
});

gulp.task('html',()=>{
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('./dist-gulp'))
})

gulp.task('styles', ()=>{
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist-gulp/css/'))
});

gulp.task('lint', ()=>{
  return gulp.src(['src/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
});

gulp.task('js', ()=>{
  return browserify('./src/js/ClientApp.js')
    .transform("babelify", {presets:["env"]})
    .bundle()
    // pass desired output filename to source stream
    .pipe(source('bundle.js'))
    // start piping the stream tasks
    .pipe(gulp.dest('./dist-gulp/js/'));
})