var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    react = require('gulp-react'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    sass = require('gulp-ruby-sass'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    port = process.env.port || 8080;

gulp.task('browserify', function() {
    return browserify([
        './app/src/js/components/questForm.js'
        ])
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./app/dist/js'));
});

gulp.task('open', function() {
    var options = {
        url: 'http://localhost:' + port,
        app: 'google chrome'
    };
    gulp.src('./app/index.html')
        .pipe(open('', options));
});

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        port: port,
        livereload: true
    });
});

gulp.task('images', function() {
return gulp.src('./app/src/assets/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest('./app/dist/images'));
});

gulp.task('sass', function() {
    return sass('./app/src/assets/scss/style.scss', {
            style: 'expanded',
            sourcemap: true
        })
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/src/css'))

    .pipe(connect.reload());
});

gulp.task('styles', function() {
    gulp.src('./app/css/styles.css')
        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./app/dist/css'));
});

//gulp.task('jshint', function() {
//    return gulp.src('app/dist/js/bundle.js')
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'));
//});

gulp.task('scripts', function() {
    gulp.src('./app/dist/**/*.js')
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src('./app/index.html')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('app/dist/js/*.js', ['scripts']);
    gulp.watch([
        'app/src/assets/scss/*.scss',
        'app/src/assets/scss/**/*.scss'
        ], ['sass']);
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/src/js/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify', 'watch', 'images', 'sass', 'styles', 'connect', 'open']);
