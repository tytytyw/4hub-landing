const gulp = require('gulp');
const rsync = require('gulp-rsync');
const sftp = require('gulp-sftp');

gulp.task('deploy-index', () => {
    return gulp.src('build/*.html')
        .pipe(sftp({
            host: '45.135.0.30',
            port: '21',
            user: 'ukrgaz',
            pass: 'XOWufnRd2G',
            remotePath: '/web/fs2.mh.net.ua/public_html/',
        }))
});

// gulp.task('deploy-index', () => {
//     return gulp.src('build/*.html')
//         .pipe(rsync({
//             root: 'build/',
//             hostname:'ukrgaz@45.135.0.30',
//             destination: '/web/fs2.mh.net.ua/public_html/',
//             archive: true,
//             silent: false,
//             compress: true,
//             progress: true
//         }))
// });

// gulp.task('deploy-static', () => {
//    return gulp.src('build/static/**')
//        .pipe({
//            root: 'build/static/',
//            hostname: '',
//            destination: '',
//            archive: true,
//            silent: false,
//            compress: true
//        })
// /web/fs2.mh.net.ua/public_html
// });

gulp.task('deploy', gulp.series('deploy-index'));