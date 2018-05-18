var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('src/breakpoint.scss')
        .pipe(notify("Compiling SASS!"))
        .pipe(sass()) 
        .pipe(gulp.dest('dist/'))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['clean', 'browserSync', 'sass'], function () {
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('*.html', browserSync.reload);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: '.'
        },
    })
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('build', [`clean`, `sass`], function () {
    console.log('Building files');
});