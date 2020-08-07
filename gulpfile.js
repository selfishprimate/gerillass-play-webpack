const { series, src, dest, watch } = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const cache = require("gulp-cache");
const autoprefixer = require("gulp-autoprefixer");

// Sass compiler
function sassify(done) {
  return (
    src("assets/scss/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          outputStyle: "expanded",
          includePaths: ["node_modules/gerillass/scss"]
        })
      ).on("error", function swallowError(error) {
        console.log(error.toString());
        this.emit("end");
      })
      .pipe(autoprefixer({ cascade: true }))
      .pipe(sourcemaps.write())
      .pipe(dest("assets/css"))
      .pipe(browserSync.stream())
  );
  done();
}

function browser_sync(done) {
  browserSync.init({
    watch: true,
    server: { baseDir: "." },
    port: 5000,
  });
  done();
}

function html() {
  return src("*.html").pipe(dest("dist"));
}

function images() {
  return src("assets/images/**/*.+(png|jpg|gif|svg)").pipe(
    dest("dist/assets/images")
  );
}

function css() {
  return src("assets/css/**/*.css").pipe(dest("dist/assets/css/"));
}

function js() {
  // The ordering is very important here!
  // First it moves all the js files
  // Second it overwrites the "scripts.js" file with the transpiled one
  return src("assets/js/**/*.js").pipe(dest("dist/assets/js/"));
}

// Deletes the dist folder
function clean_dist() {
  return del("./dist");
}

// Cleans the cache
function clear_cache(done) {
  return cache.clearAll(done);
}

function watch_files(done) {
  watch("**/*.scss", sassify);
  watch("**/*.html", browserSync.reload);
  done();
}

exports.start = series(
  clear_cache,
  browser_sync,
  sassify,
  watch_files
);
exports.build = series(
  clean_dist,
  js,
  sassify,
  css,
  images,
  html
);
