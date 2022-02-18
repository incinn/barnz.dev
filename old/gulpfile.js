require("dotenv").config();
const _PROD = process.env.MODE === "prod" ? true : false;

const { src, dest, watch, series, parallel } = require("gulp");
const gulpif = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const replace = require("gulp-replace");
const fs = require("fs");

const outputLocation = "./dist";
const sassLocation = "./src/css/main.scss";
const htmlLocation = "./src/html/index.html";
const assetLocation = "./src/assets/**/*.*";

const monthNames = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sept",
  "oct",
  "nov",
  "dec",
];

function cleanup() {
  return del([outputLocation + "/**/*"]);
}

function compileSass() {
  return src(sassLocation)
    .pipe(gulpif(!_PROD, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(cleanCSS())
    .pipe(gulpif(!_PROD, sourcemaps.write(".")))
    .pipe(dest(outputLocation));
}

function buildHtml() {
  return src(htmlLocation)
    .pipe(
      replace("%UPDATED_DATE%", () => {
        const date = new Date();
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      })
    )
    .pipe(
      replace("%STYLESHEET%", () => {
        const stylesheet = fs.readFileSync(
          outputLocation + "/main.css",
          "utf8"
        );
        return `<style type="text/css">\n${stylesheet}</style>`;
      })
    )
    .pipe(dest(outputLocation));
}

function copyAssets() {
  return src(assetLocation).pipe(dest(outputLocation));
}

function watchSource() {
  watch("./src/css/**/*.scss", series(compileSass, buildHtml));
  watch(htmlLocation, buildHtml);
}

exports.build = series(cleanup, parallel(copyAssets, compileSass), buildHtml);
exports.watch = series(
  cleanup,
  copyAssets,
  compileSass,
  buildHtml,
  watchSource
);
exports.clean = cleanup;
