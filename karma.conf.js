// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'client/bower_components/angular/angular.js',
            'client/bower_components/angular-mocks/angular-mocks.js',
            'client/bower_components/angular-resource/angular-resource.js',
            'client/bower_components/angular-aria/angular-aria.js',
            'client/bower_components/angular-cookies/angular-cookies.js',
            'client/bower_components/angular-animate/angular-animate.js',
            'client/bower_components/angular-messages/angular-messages.js',
            'client/bower_components/angular-sanitize/angular-sanitize.js',
            'client/bower_components/lodash/dist/lodash.js',
            'client/bower_components/angular-ui-router/release/angular-ui-router.js',
            'client/bower_components/angular-material/angular-material.js',
            'client/bower_components/angular-material-data-table/dist/md-data-table.js',
            'client/bower_components/tinymce/tinymce.js',
            'client/bower_components/angular-ui-tinymce/src/tinymce.js',
            'client/bower_components/ng-file-upload/ng-file-upload.js',
            'client/bower_components/angular-simple-logger/dist/angular-simple-logger.js',
            'client/bower_components/angular-google-maps/dist/angular-google-maps.js',
            'client/bower_components/angular-youtube-mb/src/angular-youtube-embed.js',
            'client/bower_components/angular-local-storage/dist/angular-local-storage.js',
            'client/app/app.js',
            'client/app/**/*.js',
            'client/components/**/*.js',
            'client/app/**/*.html',
            'client/components/**/*.html'
        ],

        preprocessors: {
            '**/*.html': 'html2js'
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'client/'
        },

        ngJade2JsPreprocessor: {
            stripPrefix: 'client/'
        },



        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
