var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ghPages = require('gulp-gh-pages');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var flatten = require('gulp-flatten');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var exec = require('child_process').exec;

function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString())
  this.emit('end')
}

gulp.task('server', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['default']);
});

gulp.task('browserify', function() {
    return browserify('./src/js/index.js')
        .bundle()
        .on('error', swallowError)
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('indexBundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./src/js/'));
});

// gulp.task('deploy', function() {
//   return gulp.src('./**/*')
//     .pipe(ghPages());
// });

gulp.task('minify-html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('publicTransportationAppFrontend'))
});

gulp.task('minify-css', function() {
  return gulp.src('src/css/**/*.css')
  .pipe(cssmin())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('publicTransportationAppFrontend/css'))
});

gulp.task('minify-js1', function() {
  return gulp.src(['src/js/app.js', 'src/js/indexBundle.js'])
  .pipe(concat('app-indexBundle.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('publicTransportationAppFrontend/js'))
});

gulp.task('minify-swjs', function() {
  return gulp.src('src/sw.js')
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('publicTransportationAppFrontend'))
});

gulp.task('copyBowerComp', function() {
  return gulp.src(['src/bower_components/jquery/dist/jquery.min.js', 'src/bower_components/bootstrap/dist/css/bootstrap.min.css'])
  // .pipe(flatten())
  .pipe(gulp.dest('publicTransportationAppFrontend/bower_components'))
});


gulp.task('installBowerComps', function (cb) {
  exec('cd src && bower install jquery && bower install bootstrap', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('default', function(callback) {
  runSequence('browserify', ['minify-html', 'minify-css','minify-js1', 'minify-swjs', 'copyBowerComp'], callback);
});

gulp.task('serve', function(callback) {
  runSequence('default', ['watch', 'server'],callback);
});
