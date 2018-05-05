const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');


gulp.task('default', ['js', 'css', 'html'] ,()=>{

})

gulp.task('js', ()=>{
    return browserify('./src/js/ClientApp.js')
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(('./dist-gulp/js')))
})

gulp.task('html',()=>{
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('dist-gulp'))
})

gulp.task('css',()=>{
  gulp.src('./src/css/**/**.css')
    .pipe(gulp.dest('dist-gulp/css'))
})