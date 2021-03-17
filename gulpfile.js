const gulp = require('gulp');
const rsync = require('gulp-rsync');

gulp.task('deploy-index', () => {
    return gulp.src('build/*.html')
        .pipe(rsync({
            root: 'build/',
            hostname: '',
            destination: '',
            archive: true,
            silent: false,
            compress: true
        }))
});

gulp.task('deploy-static', () => {
   return gulp.src('build/static/**')
       .pipe({
           root: 'build/static/',
           hostname: '',
           destination: '',
           archive: true,
           silent: false,
           compress: true
       })
});

gulp.task('deploy', gulp.series('deploy-index', 'deploy-static'));