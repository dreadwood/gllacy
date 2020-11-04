// const autoprefixer = require('autoprefixer');
const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
// const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemap = require('gulp-sourcemaps');
const sync = require('browser-sync').create();

const style = () => {
  return gulp.src('src/sass/style.scss')
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      // .pipe(postcss([autoprefixer({grid: true})]))
      .pipe(gulp.dest('dist/css'))
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
    'src/img/**',
  ], {
    base: 'src'
  })
  .pipe(gulp.dest('dist'));
}

const build = gulp.series(
  clean,
  copy,
  style,
  html,
)

const start = gulp.series(
  build,
  server,
)

exports.build = build;
exports.start = start;
