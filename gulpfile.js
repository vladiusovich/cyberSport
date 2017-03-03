'use strict';
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass'); //Подключаем Sass пакет,
const jade = require('gulp-jade'); //Подключаем Sass пакет,
const concat = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
const assets = require("gulp-assets");
const autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
const gulps = require("gulp-series");
var notify = require("gulp-notify");
const imagemin = require('gulp-imagemin');
var gzip = require('gulp-gzip');



const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task("sass", function () {
    return gulp.src('app/scss/**/*.+(scss|sass)')
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(sass())
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/css')) // Выгружаем результата в папку app/css
        // .pipe(gzip()
        .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});

gulp.task('jade', function() {
    return gulp.src('app/jade/pages/*.jade')
        .pipe(jade({pretty: true}))
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }))
        .pipe(gulp.dest('dist')) // указываем gulp куда положить скомпилированные HTML файлы
        .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});


gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('all.js'))
        // .pipe(gzip())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('browser-sync', function() {
     browserSync.init({
            server: {
            baseDir: 'dist'
        },
     notify: false
     });
});

gulp.task('assets', function() {
    return gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('dist/img'))

});


gulp.task('watch', ['browser-sync', 'sass', 'jade', 'scripts'], function() {
    gulp.watch('app/scss/**', ['sass']);
    gulp.watch('app/jade/**', ['jade']);
    gulp.watch('app/js/**', ['scripts']);

});

gulp.task('compress', function () {
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});



// gulp.task('default', ['watch']);

gulp.task('clean', function () {
    return del('css');
});



gulp.task('build', ['clean', 'compress', 'watch']);

// gulp.task('build', gulp.series('clean', gulp.parallel('assets', 'watch')));
