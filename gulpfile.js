const gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    pump = require('pump'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    cleanCSS = require('gulp-clean-css'),
    uglifyJS = require('gulp-uglify');

const path = {
    public: 'public',
    server: {
        source: 'server',
        styles() { return `${ this.source }/styles` },
        sass() { return `${ this.styles() }/sass` },
        scripts() { return `${ this.source }/scripts` }
    }
};

sass.compiler = require('node-sass');

console.log('Creating files for Public folder ....');

gulp.task('clean:build', function() {
    console.log('Cleaning all build ....');
    return del([
        `${ path.public }/*.*`, 
        `${ path.server.styles() }/*.*`
    ]);
});

gulp.task('build:css', function() {
    console.log('Building style.css from main.scss ....');
    return pump([
        gulp.src(`${ path.server.sass() }/main.scss`),
        sass.sync(),
        concat('style.css'),
        gulp.dest(`${ path.server.styles() }`)
    ], (err) => {
        if(err)  console.log('Error encountered while building css ...\n', err);
    });
});

gulp.task('minify:css', function() {
    console.log('Minifying style.css ....');
    return pump([
        gulp.src(`${ path.server.styles() }/style.css`),
        concat('style.min.css'),
        cleanCSS(),
        gulp.dest(path.public)
    ], (err) => {
        if(err) console.log('Error encountered while minifying css', err);
    });
});

gulp.task('minify:js', function() {
    console.log('Minifying script.js ....');
    return pump([
        gulp.src(`${ path.server.scripts() }/script.js`),
        babel({ presets: ['@babel/preset-env'] }),
        uglifyJS(),
        concat('script.min.js'),
        gulp.dest(path.public)
    ], (err) => {
        if(err) console.log('Error encountered while minifying js', err);
    });
});

gulp.task('watch', function(){
    gulp.watch('server/styles/**/*.scss', gulp.series('clean:build', 'build:css', gulp.parallel('minify:css', 'minify:js'))); 
});

gulp.task('default', gulp.series('clean:build', 'build:css', gulp.parallel('minify:css', 'minify:js'))); 