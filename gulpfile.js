const del = require('del');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sync = require('browser-sync').create();

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
  html,
)

const start = gulp.series(
  build,
  server,
)

exports.build = build;
exports.start = start;
