const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const plumber = require('gulp-plumber');

gulp.task('sass', () => gulp.src('./css/main.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('all.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./css'))
);

// .pipe(browserSync.stream()));


gulp.task('watch', () => {
    gulp.watch('css/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('sass', 'watch'));
