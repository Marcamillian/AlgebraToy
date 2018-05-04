const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');


gulp.task('default', ()=>{

})

gulp.task('js', ()=>{
    return browserify('./src/js/ClientApp.js')
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(('./dist-gulp/js')))
})