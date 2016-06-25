/// <binding Clean='clean' />

// suggested this must be done manually:
// npm install es6-promise@^3.0.2 es6-shim@^0.35.0 reflect-metadata@0.1.2 rxjs@5.0.0-beta.2 zone.js@^0.6.4
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var webroot = "./wwwroot/";

var paths = {
	scripts: webroot + "scripts/**/*.js",
	ts: webroot + "scripts/**/*.ts",
	maps: webroot + "scripts/**/*.map",
	minJs: webroot + "scripts/**/*.min.js",
    css: webroot + "css/**/*.css",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "scripts/site.min.js",
    concatCssDest: webroot + "css/site.min.css",
    libs: ['node_modules/angular2/bundles/angular2.js',
           'node_modules/angular2/bundles/angular2-polyfills.js',
           'node_modules/systemjs/dist/system.src.js',
           'node_modules/rxjs/bundles/Rx.js']
};

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.scripts, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

gulp.task('lib', function () {
	gulp.src(paths.libs).pipe(gulp.dest(webroot + "scripts/lib"));
});

gulp.task('default', ['lib'], function () {
	gulp.src(paths.scripts).pipe(gulp.dest(webroot + "scripts"));
});
