'use strict';

// Configuration.

var config = {};
config.source = './source';
config.patternLab = {
  dir: './public',
  watchFiles: [
    config.source + '/**/*.hbs',
    config.source + '/**/*.json',
    config.source + '/**/*.md'
  ],
  publicCssDir: './public/css',
  publicJsDir: './public/js'
};
config.browserSync = {
  server: {
    baseDir: config.patternLab.dir
  },
  proxy: {
    target: '',
    reqHeaders: {
      host: ''
    }
  },
  open: false
};
config.sass = {
  srcFiles: [
    './source/sass/*.scss'
  ],
  watchFiles: [
    './source/sass/**/*.scss',
    config.source + '/**/*.scss'
  ],
  options: {
    includePaths: [
      './source/sass',
      './node_modules/bootstrap-scss/',
      './node_modules/normalize-scss/'
    ],
    outputStyle: 'expanded'
  },
  destDir: './source/css'
};
config.js = {
  srcFiles: [
    './source/js/*.js'
  ],
  watchFiles: [
    './source/js/*.js'
  ]
};


// Load Gulp and other tools.

// Allows access to the file system
var fs = require('fs');
// Allows browser refresh and syncing
var browserSync = require('browser-sync').create();
// Allows running of gulp tasks
var gulp = require('gulp');
// Allows run of php command from gulp
var run = require('gulp-run');
// Allows the compilation of scss files to css
var sass = require('gulp-sass');
// Allows the importing of wildcard scss routes
var sassGlob = require('gulp-sass-glob');
// Allows the linting of scss files
var sassLint = require('gulp-sass-lint');
// Allows the building of sourcemaps
var sourcemaps = require('gulp-sourcemaps');

var cleanCSS = require('gulp-clean-css');
var size = require('gulp-size');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

// var pattern_config = require('./patternlab-config.json');
// var patternlab = require('@pattern-lab/core')(pattern_config);

// Helper functions.

function isDirectory(dir){
  try {
    return fs.statSync(dir).isDirectory();
  }
  catch (err){
    return false;
  }
}

// Gulp tasks.

/**
 * Sets up Browsersync and watchers.
 */
gulp.task('watch', function(){
  if (config.browserSync.proxy.target){
    browserSync.init({
      proxy: config.browserSync.proxy,
      open: config.browserSync.open,
      notify: false
    });
  }
  else {
    browserSync.init({
      server: config.browserSync.server,
      open: config.browserSync.open,
      notify: false
    });
  }
  gulp.watch(config.sass.watchFiles, gulp.series('sass-change'));
  gulp.watch(config.js.watchFiles, gulp.series('js-change'));
  gulp.watch(config.patternLab.watchFiles, gulp.series('patterns-change'));
});

/**
 * Processes Sass files and updates Browsersync.
 */
gulp.task('sass', function(){
  return gulp.src(config.sass.srcFiles)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(size())
    .pipe(sass(config.sass.options).on('error', sass.logError))
    .pipe(gulp.dest(config.sass.destDir))
    .pipe(sourcemaps.write('./'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('prefix-css', function(){
  return gulp.src(config.sass.destDir + '/style.css')
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(config.sass.destDir))
    .pipe(browserSync.stream());
});

gulp.task('minify-css', function(){
  return gulp.src([config.sass.destDir + '/*.css',  '!' + config.sass.destDir + '/*.min.css'])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.sass.destDir))
    .pipe(browserSync.stream());
});

/**
 * Copies CSS files to Pattern Lab's public dir.
 */
gulp.task('copy-css', function(){
  if (isDirectory(config.patternLab.dir)){
    return gulp.src(config.sass.destDir + '/**/*.css')
      .pipe(gulp.dest(config.patternLab.publicCssDir))
      .pipe(browserSync.stream());
  }
});

gulp.task('copy-js', function(){
  if (isDirectory(config.patternLab.dir)){
  return gulp.src(config.js.srcFiles)
    .pipe(gulp.dest(config.patternLab.publicJsDir))
    .pipe(browserSync.stream());
  }
})

/**
 * Generates Pattern Lab front-end.
 */
gulp.task('patternlab-build', function() {
  if (isDirectory(config.patternLab.dir)) {
    return run('npm run pl:build').exec();
  }
});

/**
 * Calls Browsersync reload.
 */
gulp.task('browser-reload', function() {
  if (isDirectory(config.patternLab.dir)) {
    return run('npm run pl:build').exec();
  }
});

function reload(done) {
  browserSync.reload();
  done();
}

/**
 * Task sequence to run when Sass files have changed.
 */
gulp.task('sass-change', gulp.series('sass', 'prefix-css', 'minify-css', 'copy-css'));

/**
 * Task sequence to run when JS files have changed.
 */
gulp.task('js-change', gulp.series('copy-js'));

/**
 * Task sequence to run when pattern files have changed.
 */
gulp.task('patterns-change', gulp.series('patternlab-build', reload));

/**
 * Gulp default task.
 */
gulp.task('default', gulp.parallel('sass-change', 'js-change', 'patterns-change', 'watch'));
