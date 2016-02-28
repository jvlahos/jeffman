'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var postcssScssSyntax = require('postcss-scss');
var reporter = require('postcss-reporter');
var autoprefixer = require('autoprefixer');
var stylelint = require('stylelint');

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%']
};

gulp.task("lint:scss", function () {
  return gulp.src(["scss/**/*.scss", "!scss/starters/_reset-customizable.scss"])
  .pipe(postcss([
    stylelint,
    reporter({ clearMessages: true })
  ], {
    syntax: postcssScssSyntax
  }))
})

gulp.task("compile:scss", function () {
  return gulp.src("./scss/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(autoprefixerOptions)
    ]))
    .pipe(gulp.dest('./css'));
})

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['lint:scss'] ['compile:scss']);
});

// Default Task
gulp.task('default', ['lint:scss', 'compile:scss']);
