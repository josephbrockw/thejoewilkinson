// var gulp = require('gulp');
// var livereload = require('gulp-livereload')
// var uglify = require('gulp-uglifyjs');
// var sass = require('gulp-sass');
// var autoprefixer = require('gulp-autoprefixer');
// var sourcemaps = require('gulp-sourcemaps');
// var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');




// gulp.task('default', function () {
//     return gulp.src('./themes/zurb_foundation/images/*')
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngquant()]
//         }))
//         .pipe(gulp.dest('./themes/zurb_foundation/images'));
// });


// gulp.task('sass', function () {
//   gulp.src('./themes/zurb_foundation/scss/**/*.scss')
//     .pipe(sourcemaps.init())
//         .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//         .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./themes/zurb_foundation/css'));
// });


// gulp.task('uglify', function() {
//   gulp.src('./themes/zurb_foundation/lib/*.js')
//     .pipe(uglify('main.js'))
//     .pipe(gulp.dest('./themes/zurb_foundation/js'))
// });

// gulp.task('watch', function(){
//     livereload.listen();

//     gulp.watch('./themes/zurb_foundation/sass/**/*.scss', ['sass']);
//     gulp.watch('./themes/zurb_foundation/lib/*.js', ['uglify']);
//     gulp.watch(['./themes/zurb_foundation/css/style.css', './themes/zurb_foundation/**/*.twig', './themes/custom/endymion/js/*.js'], function (files){
//         livereload.changed(files)
//     });
// });

var gulp = require('gulp');
var gulp = require('gulp-sass');
var watch = require('gulp-watch');
//var $    = require('gulp-load-plugins')();

gulp.task('default', function() {
  return gulp.src('themes/zurb_foundation/scss/*.scss')
    .pipe(watch('scss/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest('dist'));
    // var sassPaths = [
    //   'bower_components/foundation-sites/scss',
    //   'bower_components/motion-ui/src'
    // ];

    // gulp.task('sass', function() {
    //   return gulp.src('scss/app.scss')
    //     .pipe($.sass({
    //       includePaths: sassPaths
    //     })
    //       .on('error', $.sass.logError))
    //     .pipe($.autoprefixer({
    //       browsers: ['last 2 versions', 'ie >= 9']
    //     }))
    //     .pipe(gulp.dest('css'));
    // });

    // gulp.task('default', ['sass'], function() {
    //   gulp.watch(['scss/**/*.scss'], ['sass']);
    // });
});