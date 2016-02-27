'use strict';
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var postcssScss = require('postcss-scss');
var reporter = require('postcss-reporter');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var stylelint = require('stylelint');

var stylelintOptions = {
  "rules": {
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "declaration-colon-space-after": "always",
    "declaration-colon-space-before": "never",
    "function-comma-space-after": "always",
    "function-url-quotes": "double",
    "media-feature-colon-space-after": "always",
    "media-feature-colon-space-before": "never",
    "media-feature-name-no-vendor-prefix": true,
    "max-empty-lines": 5,
    "number-leading-zero": "always",
    "number-no-trailing-zeros": true,
    "property-no-vendor-prefix": true,
    "rule-no-duplicate-properties": true,
    "declaration-block-no-single-line": true,
    "rule-trailing-semicolon": "always",
    "selector-list-comma-space-before": "never",
    "selector-list-comma-newline-after": "always",
    "selector-no-id": true,
    "string-quotes": "double",
    "value-no-vendor-prefix": true
  }
}

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%']
};

var postcssLint = [
    stylelint(stylelintOptions),
    reporter({ clearMessages: true })
];

var postcssBuild = [
    autoprefixer(autoprefixerOptions)
];

gulp.task("lint:scss", function () {
  return gulp.src(["scss/**/*.scss", "!scss/starters/_reset-customizable.scss"])
  .pipe(postcss(postcssLint, {syntax: postcssScss}))
})

gulp.task("compile:scss", function () {
  return gulp.src("./scss/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postcssBuild))
    .pipe(gulp.dest('./css'));
})

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['lint:scss'] ['compile:scss']);
});

// Default Task
gulp.task('default', ['lint:scss', 'compile:scss']);
