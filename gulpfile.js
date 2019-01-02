var gulp = require('gulp');
var scss = require('gulp-sass');
var concat = require('gulp-concat');
var Cleancss = require('gulp-clean-css');
var Ujs = require('gulp-uglify')
    // var babel = require('gulp-babel')
var server = require('gulp-webserver')

gulp.task('scss', function() {
    return gulp.src('src/scss/*.scss')
        //编译scss
        .pipe(scss())
        .pipe(concat('all.css'))
        //压缩
        .pipe(Cleancss())
        .pipe(gulp.dest('src/css'))
})

gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(Ujs())
        .pipe(concat('all.js'))
        // .pipe(babel())
        .pipe(gulp.dest('src/Ujs'))
})

//监听scss   js
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', gulp.series('scss'))
    gulp.watch('src/js/*.js', gulp.series('js'))
})

//服务
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090
        }))
})

gulp.task('build', function() {
    return gulp.src('src/*/*.{js,css}')
        .pipe(gulp.dest('./build'))
})

gulp.task('default', gulp.parallel('watch', 'build', 'server'))