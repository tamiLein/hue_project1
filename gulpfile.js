let gulp = require('gulp');
let cssmin = require('gulp-cssmin');
let uglify = require('gulp-uglify');
let autoprefixer = require('gulp-autoprefixer');
let browserSync = require('browser-sync').create();

gulp.task('css', function() {
  gulp.src('src/css/**/*.css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('build/css'));
});

gulp.task('font', function() {
    gulp.src('src/font/**/*.ttf')
        .pipe(gulp.dest('build/font'));
});

gulp.task('js', function() {
  gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('templates', function() {
  gulp.src('src/templates/**/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('img', function() {
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('build/img'));
});

gulp.task('json', function() {
    gulp.src('src/json/**/*')
        .pipe(gulp.dest('build/json'));
});

gulp.task('watch', function() {
  gulp.watch('src/css/**/*.css', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/templates/**/*.html', ['templates']);
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    },
    files: ['./build/**/*'],
    reloadDebounce: 500
  });
});

gulp.task('default', ['css', 'font', 'js', 'templates', 'img', 'json']);
gulp.task('dev', ['default', 'watch', 'serve']);