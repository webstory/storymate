var args        = require('yargs').argv,
    path        = require('path'),
    through     = require('through2'),
    gulp        = require('gulp'),
    babel       = require('gulp-babel'),
    clean       = require('gulp-clean'),
    $           = require('gulp-load-plugins')(),
    gulpsync    = $.sync(gulp),
    PluginError = $.util.PluginError;

// production mode (see build task)
var isProduction = false;
// styles sourcemaps
var useSourceMaps = false;

// MAIN PATHS
var paths = {
  app:'../app/',
};


// SOURCES CONFIG
var source = {
  common: {
    scripts: ['common/js/**/*.js'],
    styles: {
      app:    ['common/less/*.less'],
      themes: ['common/less/themes/*'],
    },
  },
  pages: {
    jade : ['pages/**/*.jade'],
    js :   ['pages/**/*.js'],
    less : ['pages/**/*.less'],
  },
  assets: ['assets/**/*']
};

// PLUGINS OPTIONS
var vendorUglifyOpts = {
  mangle: {
    except: ['$super'] // rickshaw requires this
  }
};


//---------------
// TASKS
//---------------


// COMMON SCRIPTS
gulp.task('common:scripts', function() {
    log('Building common scripts..');
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.common.scripts)
        .pipe( $.if( useSourceMaps, $.sourcemaps.init() ))
        .pipe(babel({modules:'ignore'}))
        .pipe($.concat('app.js'))
        .on("error", handleError)
        .pipe( $.if(isProduction, $.uglify({preserveComments:'some'}) ))
        .on("error", handleError)
        .pipe( $.if( useSourceMaps, $.sourcemaps.write() ))
        .pipe(gulp.dest(paths.app + 'common/js'));
});

// COMMON STYLES
gulp.task('common:styles', function() {
    log('Building common styles..');
    // Minify and copy all Less files
    return gulp.src(source.common.styles.app)
        .pipe( $.if( useSourceMaps, $.sourcemaps.init() ))
        .pipe( $.less() )
        .on("error", handleError)
        .pipe(gulp.dest(paths.app + 'common/css'));
});

// THEME LESS
gulp.task('common:styles:themes', function() {
    log('Building application theme styles..');
    return gulp.src(source.common.styles.themes)
        .pipe( $.less() )
        .on("error", handleError)
        .pipe(gulp.dest(paths.app + 'common/css'));
});


// VENDOR BUILD
// copy file from bower folder into the app vendor folder
gulp.task('vendor', function() {
  log('Copying vendor assets..');

  return gulp.src('bower_components/**/*')
      .pipe( gulp.dest(paths.app + 'vendor') );
});

// PAGE SPECIFIC RESOURCES
gulp.task('pages:scripts', function() {
  log('Building application scripts..');
  return gulp.src(source.pages.js)
      // .pipe(babel({modules:'ignore'}))
      // .pipe(babel({modules:'amd', "moduleIds":true}))
      .pipe(babel({modules:'amd'}))
      .on("error", handleError)
      .pipe($.if( isProduction, $.uglify({preserveComments:'some'}) ))
      .on("error", handleError)
      .pipe($.if( useSourceMaps, $.sourcemaps.write() ))
      .pipe(gulp.dest(paths.app));
});

gulp.task('pages:styles', function() {
    log('Building application styles..');
    return gulp.src(source.pages.less)
        .pipe( $.if( useSourceMaps, $.sourcemaps.init() ))
        .pipe( $.less() )
        .on("error", handleError)
        .pipe( $.if( isProduction, $.minifyCss() ))
        .pipe(gulp.dest(paths.app));
});


// JADE PAGES
gulp.task('pages', function() {
    log('Building pages..');
    return gulp.src(source.pages.jade)
        .pipe($.filter(function (file) {
            return !/[\/\\]_/.test(file.path) && !/[\/\\]_/.test(file.relative) && !/^_/.test(file.relative);
          }))
        .pipe($.jade())
        .on("error", handleError)
        .pipe(gulp.dest(paths.app));
});

// ASSETS
gulp.task('assets', function() {
    log('Copying assets...');
    return gulp.src(source.assets)
        .pipe(gulp.dest(paths.app + 'assets'));
});

//---------------
// WATCH
//---------------

// Rerun the task when a file changes
gulp.task('watch', function() {
  log('Starting watch and LiveReload..');

  $.livereload.listen();

  gulp.watch(source.common.scripts,           ['common:scripts']);
  gulp.watch(source.common.styles.app,        ['common:styles']);
  gulp.watch(source.common.styles.themes,     ['common:styles:themes']);

  gulp.watch(source.pages.jade,               ['pages']);
  gulp.watch(source.pages.js,                 ['pages:scripts']);
  gulp.watch(source.pages.less,               ['pages:styles']);

  gulp.watch(source.assets,                   ['assets']);

  // a delay before triggering browser reload to ensure everything is compiled
  var livereloadDelay = 1500;
  // list of source file to watch for live reload
  var watchSource = [].concat(
    source.common.scripts,
    source.common.styles.app,
    source.common.styles.themes,
    source.pages.jade,
    source.pages.js,
    source.pages.less,
    source.assets
    );

  gulp
    .watch(watchSource)
    .on('change', function(event) {
      setTimeout(function() {
        $.livereload.changed( event.path );
      }, livereloadDelay);
    });

});


//---------------
// MAIN TASKS
//---------------

// build for production (minify)
gulp.task('build', ['prod','vendor','compile']);

gulp.task('prod', function() {
  log('Starting production build...');
  isProduction = true;
});

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function(){ useSourceMaps = true; });

// default (no minify)
gulp.task('default', ['compile','vendor','watch'], function(){

  log('************');
  log('* All Done * You can start editing your code, LiveReload will update your browser after any change..');
  log('************');

});

gulp.task('compile',[
          'common:scripts',
          'common:styles',
          'common:styles:themes',
          'pages',
          'pages:scripts',
          'pages:styles',
          'assets'
        ]);


gulp.task('clean', function() {
  log("Clean up.");
  return gulp.src(paths.app)
      .pipe(clean({force:true}));
});

/////////////////////


// Error handler
function handleError(err) {
  log(err.toString());
  this.emit('end');
}

// log to console using
function log(msg) {
  $.util.log( $.util.colors.blue( msg ) );
}
