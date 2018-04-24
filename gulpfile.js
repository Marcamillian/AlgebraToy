// USED FROM - https://gist.github.com/danharper/3ca2273125f500429945

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ()=>{
  console.log("Something is here")
});

gulp.task('styles', (()=>{
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist-gulp/css'))
}));