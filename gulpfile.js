require('dotenv').config();
const _PROD = process.env.MODE === 'prod' ? true : false;

const { src, dest, watch, series, parallel } = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const replace = require('gulp-replace');

const outputLocation = './dist';
const sassLocation = './src/css/main.scss';
const htmlLocation = './src/html/index.html';
const assetLocation = './src/assets/**/*.*';

const monthNames = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sept',
    'oct',
    'nov',
    'dec',
];

function cleanup() {
    return del([outputLocation + '/**/*']);
}

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
    return src(htmlLocation)
        .pipe(
            replace('%UPDATED_DATE%', () => {
                const date = new Date();
                return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
            })
        )
        .pipe(dest(outputLocation));
}

function copyAssets() {
    return src(assetLocation).pipe(dest(outputLocation));
}

function watchSource() {
    watch('./src/css/**/*.scss', compileSass);
    watch(htmlLocation, copyHtml);
}

exports.build = series(cleanup, parallel(copyHtml, copyAssets, compileSass));
exports.watch = series(cleanup, copyHtml, copyAssets, compileSass, watchSource);
exports.clean = cleanup;
