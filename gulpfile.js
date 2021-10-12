require('dotenv').config();
const _PROD = process.env.MODE === 'production' ? true : false;

const { src, dest, watch, series } = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const outputLocation = './dist';
const sassLocation = './src/css/main.scss';
const htmlLocation = './src/html/index.html';

function compileSass() {
    return src(sassLocation)
        .pipe(gulpif(!_PROD, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(cleanCSS())
        .pipe(gulpif(!_PROD, sourcemaps.write('.')))
        .pipe(dest(outputLocation));
}

function copyHtml() {
    return src(htmlLocation).pipe(dest(outputLocation));
}

function watchSource() {
    watch(sassLocation, compileSass);
    watch(htmlLocation, copyHtml);
}

exports.build = series(copyHtml, compileSass);
exports.watch = series(copyHtml, compileSass, watchSource);
