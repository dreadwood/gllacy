const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const gulpWebp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const order = require('gulp-order');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemap = require('gulp-sourcemaps');
const svgstore = require('gulp-svgstore')
const sync = require('browser-sync').create();
const uglify = require('gulp-uglify');

const style = () => {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('dist/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(sync.stream());
}

const html = () => {
  return gulp.src('src/pug/pages/*.pug')
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest('dist'));
}

const images = () => {
  return gulp.src('src/img/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('dist/img'));
};

const webp = () => {
  return gulp.src('src/img/*.{png,jpg}')
    .pipe(gulpWebp({quality: 75}))
    .pipe(gulp.dest('dist/img'));
}

const sprite = () => {
  return gulp.src('src/img/icon-*.svg')
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('dist/img'));
}

const jsVendor = () => {
  return gulp.src('src/js/vendor/*.js')
    .pipe(sourcemap.init())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename("vendor.min.js"))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('dist/js'));
};

const jsScript = () => {
  return gulp.src('src/js/modules/*.js')
    .pipe(order([
      'utils.js',
      '*.js',
    ]))
    .pipe(sourcemap.init())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('dist/js'));
}

const server = () => {
  sync.init({
    server: 'dist/',
    notify: false,
    open: false,
    cors: true,
    ui: false
  });

  gulp.watch('src/**/*.pug', gulp.series(html, refresh));
  gulp.watch('src/sass/**/*.scss', gulp.series(style));
  gulp.watch('src/img/icon-*.svg', gulp.series(sprite, html, refresh));
  gulp.watch('src/js/*/*.js', gulp.series(jsScript, jsVendor, refresh));
}

const refresh = (done) => {
  sync.reload();
  done();
}

const clean = () => {
  return del('dist');
}

const copy = () => {
  return gulp.src([
    'src/fonts/**/*.{woff,woff2}',
    'src/manifest.webmanifest',
    'src/favicon.ico',
    'src/icon*.*',
    'src/apple-touch-icon.*',
  ], {
    base: 'src'
  })
  .pipe(gulp.dest('dist'));
}

const build = gulp.series(
  clean,
  images,
  webp,
  sprite,
  jsVendor,
  jsScript,
  copy,
  style,
  html,
)

const start = gulp.series(
  build,
  server,
)

exports.sprite = sprite;
exports.build = build;
exports.start = start;
