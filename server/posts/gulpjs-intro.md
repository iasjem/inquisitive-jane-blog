# An Awesome Treat from Gulp JS

![gulp logo](/img/gulp-logo.jpg)

[Gulp JS](https://gulpjs.com/) is a javascript task runner that is built to automate and enhance development workflow efficiently. With this cool toolkit, you will be able to do the following:
- Compress your stylesheets and scripts
- Compile Sass, SCSS and LESS 
- Combine your files into one single file respectively for compression later in development
- Watching files to automate running tasks after saving any changes
- Live-reloading of server for development and testing purposes
  
Now, we are going to get a glimpse of how gulp works by creating a short [Glitch starter project](https://glitch.com/edit/#!/nifty-gulp-starter) that compiles Sass to a css file and then compressing css to a minified version. 


## Tools to Use

We need to install Gulp with `npm install` and have the following dependencies in our `package.json` file:

```json
  "devDependencies": {
    "gulp": "^4.0.0",
    "gulp-clean-css": "^4.0.0",
    "gulp-concat": "^2.6.1",
    "gulp-sass": "^4.0.2",
    "node-sass": "^4.11.0"
  },
  "dependencies": {
    "express": "^4.16.4",
    "del": "^3.0.0",
    "pump": "^3.0.0"
  }
```

We are all set to use `gulp` in our project but before anything else, we still need to create a `gulpfile.js` since `gulp` will look for this file when running gulp to our terminal. 


## Quick Tutorial

Let us now begin coding by opening our `gulpfile.js` and require all of the dependencies we need to achieve our project goal:

```javascript
const gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    pump = require('pump'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css');
```

Before we proceed to the good stuff, let me first explain what each of the dependencies are for:

- `gulp` - We all know what this is already. This our JS task runner as mentioned above
- `gulp-concat` - We will use this later to rename the newly created file being compiled and compressed
- `del` - This for removing folders or files to ensure a clean build
- `pump` - Organize how we use gulp instead of `.pipe()` and error handling as explained in gulp's official docs on [Why Use Pump?](https://github.com/gulpjs/gulp/tree/master/docs/why-use-pump)
- `gulp-sass` - We need this to compile Sass together with the dev dependency `node-sass`
- `gulp-clean-css` - Use to 'minify' or compress a CSS file

The good stuff happens now! Let's start with creating an object for the path sources and destinations. Then, we aassign our Sass compiler to `node-sass`:

```javascript
const path = {
    public: 'public',
    build: {
        source: 'build',
        sass() {
            return `${ this.source }/main.scss`
        },
        css() {
            return  `${ this.source }/style.css`;
        }
    }
};

sass.compiler = require('node-sass');
```

We should be able to create a task now. Let's start with the task of cleaning our build:

```javascript
gulp.task('clean:build', function() {
    // delete these files please
    return del([ 
        `${ path.public }/*.*`, 
        `${ path.build.source }/*.*`
    ]);
});
```
Let's continue with creating the other task for compiling Sass to a css file and compressing the file to a minified version:

```javascript
gulp.task('build:css', function() {
    return pump([
        // find the source first
        gulp.src(path.build.sass()),
        // Compile Sass then...
        sass.sync(), 
        // Rename new file to...
        concat('style.css'), 
        // and place it on this destination!
        gulp.dest(path.build.source)
    ], (err) => {
        // if there are errors, please let me know!
        if(err)  console.log(err);
    });
});

gulp.task('minify:css', function() {
    return pump([
        // find the source first
        gulp.src(path.build.css()),
        // Rename new file to...
        concat('style.min.css'),
        // Compress all code inside CSS
        cleanCSS(),
        // and place it on this destination!
        gulp.dest(path.public)
    ], (err) => {
        // if there are errors, please let me know!
        if(err) console.log(err);
    });
});
```

To run all of the tasks above, we need to call on the default task and assign it as a series of tasks:

```javascript
// Do all of the tasks one by one...
gulp.task('default', gulp.series('clean:build', 'build:css', 'minify:css'));
```

Once `gulpfile.js` is saved, we can now return to our terminal and type `gulp` to see this:

```bash
$ gulp
[05:48:48] Using gulpfile ~/gulpfile.js
[05:48:48] Starting 'default'...
[05:48:48] Starting 'clean:build'...
[05:48:48] Finished 'clean:build' after 9.03 ms
[05:48:48] Starting 'build:css'...
[05:48:48] Finished 'build:css' after 74 ms
[05:48:48] Starting 'minify:css'...
[05:48:49] Finished 'minify:css' after 49 ms
[05:48:49] Finished 'default' after 136 ms
```

Everything is now done! If you encountered any error, you can always check out our [finished project](https://glitch.com/edit/#!/nifty-gulp-done?path=public/style.min.css:1:0) and refer to it for code comparison.


## Issue with Glitch Editor

Are you worried that you don't see the minified version of the css file we created when we compiled Sass? Unfortunately because of some connection issues with Glitch (could be a bug), a simple `refresh` command in our terminal will not fix this issue right away. 

Just reload page for the Glitch editor. You should be able to see the results of both `style.css` and `style.min.css` now. Even if you experience this issue, you will still be able to see the [minified version](https://nifty-gulp-done.glitch.me/style.min.css) of our `style.css` anyway since we provided the correct path to our `style.min.css` and the `gulp` setup we created awhile ago.


## Conclusion

There are plenty of ways to use Gulp to our advantage as developers. Just like webpack, it is possible to use Babel and JS compression for our javascript files by installing more plugins like `gulp-babel` and `gulp-uglify`. There are so much possibilities to use Gulp JS and we should cherish such amazing tool!

There are more information about it on the [offical website](https://gulpjs.com/docs/en/getting-started/quick-start) and [Github repository](https://github.com/gulpjs/gulp). It's all up to you now. 

Happy Coding! 😄👍