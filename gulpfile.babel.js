import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import cssnano from 'cssnano';
import mqpacker from 'css-mqpacker';
import gulp from 'gulp';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import htmlmin from 'gulp-htmlmin';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import prettify from 'gulp-prettify';
import runSequence from 'run-sequence';
import twig from 'gulp-twig';
import util from 'gulp-util';

const pkg = require('./package.json');

// Static files to copy

const copy = [pkg.paths.src.images + '**/*'];

const onError = function (err) {
  console.log(err.message);
  this.emit('end');
};

// BrowserSync

gulp.task('browserSync', () => {
  browserSync.init({
    server: pkg.paths.build.root,
    notify: false
  });
});

// Twig

gulp.task('twig', () => {
  return gulp
    .src([
      pkg.paths.src.templates + '**/*/*.html',
      pkg.paths.src.templates + 'index.html'
    ])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(twig())
    .pipe(
      !util.env.production ? prettify({ indent_inner_html: true }) : util.noop()
    )
    .pipe(
      util.env.production ? htmlmin({ collapseWhitespace: true }) : util.noop()
    )
    .pipe(gulp.dest(pkg.paths.build.root));
});

gulp.task('twig-watch', ['twig'], done => {
  browserSync.reload();
  done();
});

// Static

gulp.task('static', () => {
  return gulp
    .src(copy, {
      base: pkg.paths.src.root
    })
    .pipe(gulp.dest(pkg.paths.build.root));
});

// Clean

gulp.task('clean', () => {
  return gulp
    .src(pkg.paths.build.root, {
      read: false
    })
    .pipe(clean());
});

// Build
// Run with '--production' for minified output

gulp.task('build', () => {
  runSequence('static', 'twig-watch');
});

// Watch

gulp.task('watch', ['browserSync'], () => {
  gulp.watch(pkg.paths.src.templates + '**/*.html', ['twig-watch']);
});

// Default

gulp.task('default', () => {
  gulp.start('watch');
});
