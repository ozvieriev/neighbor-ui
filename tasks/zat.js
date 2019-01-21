const del = require('del');
const gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('zat:clean', () => {

    return del(['zat/assets']);
});

gulp.task('zat:assets', () => {

    return gulp.src('dist/**/*.*')
        .pipe(gulp.dest('zat/assets'));
});
gulp.task('zat:images', () => {

    return gulp.src('zat/images/**/*.*')
        .pipe(gulp.dest('zat/assets'));
});

gulp.task('zat:server', () => {

    return exec('zat server --path zat');
});


gulp.task('zat', gulp.series('zat:clean', 'zat:assets', 'zat:images', 'zat:server'));