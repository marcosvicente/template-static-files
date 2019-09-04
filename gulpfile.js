"user strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var imagemin = require('gulp-imagemin');
var csso = require('gulp-csso');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');


// run sass
gulp.task('sass', function() {
    return gulp.src('src/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css/')
    );
});


// run watch
gulp.task('watch',  function (){
  gulp.watch('src/scss/style.scss', gulp.series('sass'));
});


// minify Js
gulp.task('jsmin', function () {
    return pipeline(
        gulp.src('src/js/*.js'),
        uglify(),
        gulp.dest('dist/js')
    );
});


// minify Css
gulp.task('cssmin', function () {
    return (
        gulp.src('src/css/*.css')
        .pipe(csso())
        .pipe(gulp.dest('dist/css/'))
    )
});


// minify image only
gulp.task('imagemin', function(){
    return (
        gulp.src('src/img/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'))
    );
});


// minify html min
gulp.task('htmlmin', function() {
    return gulp.src(['src/page/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist/page/'));
});


// minify fonts
gulp.task('font', function() {
  return gulp.src('src/font/*')
  .pipe(gulp.dest('dist/font'));
});



gulp.task('compile-es6', function () {
    return gulp.src('src/es6/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('src/js'));
});


// clean path production
gulp.task('clean', function(){
     return del('dist/**', {force:true});
});


// Gulp task to minify all files
gulp.task('default', gulp.series( 'clean', 'cssmin', 'jsmin', 'font', 'htmlmin', 'imagemin'));


