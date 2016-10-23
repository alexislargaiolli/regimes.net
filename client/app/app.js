'use strict';

angular.module('regimesApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ngMessages',
        'md.data.table',
        'ui.router',
        'ngMaterial',
        'ui.tinymce',
        'ngFileUpload',
        'uiGmapgoogle-maps',
        'youtube-embed',
        'LocalStorageModule'
    ])
    .config(function($mdIconProvider) {
        $mdIconProvider
            .iconSet('action', '../assets/iconsets/action-icons.svg', 24)
            .iconSet('alert', '../assets/iconsets/alert-icons.svg', 24)
            .iconSet('av', '../assets/iconsets/av-icons.svg', 24)
            .iconSet('communication', '../assets/iconsets/communication-icons.svg', 24)
            .iconSet('content', '../assets/iconsets/content-icons.svg', 24)
            .iconSet('device', '../assets/iconsets/device-icons.svg', 24)
            .iconSet('editor', '../assets/iconsets/editor-icons.svg', 24)
            .iconSet('file', '../assets/iconsets/file-icons.svg', 24)
            .iconSet('hardware', '../assets/iconsets/hardware-icons.svg', 24)
            .iconSet('icons', '../assets/iconsets/icons-icons.svg', 24)
            .iconSet('image', '../assets/iconsets/image-icons.svg', 24)
            .iconSet('maps', '../assets/iconsets/maps-icons.svg', 24)
            .iconSet('navigation', '../assets/iconsets/navigation-icons.svg', 24)
            .iconSet('notification', '../assets/iconsets/notification-icons.svg', 24)
            .iconSet('social', '../assets/iconsets/social-icons.svg', 24)
            .iconSet('toggle', '../assets/iconsets/toggle-icons.svg', 24)
            .iconSet('avatar', '../assets/iconsets/avatar-icons.svg', 128);
    })
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDqLwxyqZckv23WJ_JwOCWCg65-5Blp6ok',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'geometry,visualization,places',
        });
    })
    .config(function(localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('regimes.net');
    })
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
        tinyMCE.baseURL = '/assets/others/tinymce'; // jshint ignore:line
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
        $mdThemingProvider.definePalette('regimePurple', {
            '50': 'EDE7F6',
            '100': 'D1C4E9',
            '200': 'B39DDB',
            '300': '9575CD',
            '400': '7E57C2',
            '500': '811da7',
            '600': '9800d1',
            '700': '512DA8',
            '800': '4527A0',
            '900': '311B92',
            'A100': 'B388FF',
            'A200': '7C4DFF',
            'A400': '651FFF',
            'A700': '6200EA',
            'contrastDefaultColor': 'light', // whether, by default, text (contrast)
            // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'
            ],
            'contrastLightColors': undefined // could also specify this if default was 'dark'
        });
        //9800d1
        $mdThemingProvider.definePalette('regimeGreen', {
            '50': 'F1F8E9',
            '100': 'DCEDC8',
            '200': 'C5E1A5',
            '300': 'AED581',
            '400': '9CCC65',
            '500': '71b300',
            '600': '71b300',
            '700': '689F38',
            '800': '558B2F',
            '900': '33691E',
            'A100': 'CCFF90',
            'A200': '71b300',
            'A400': '76FF03',
            'A700': '77bc01',
            'contrastDefaultColor': 'light', // whether, by default, text (contrast)
            // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'
            ],
            'contrastLightColors': undefined // could also specify this if default was 'dark'
        });



        $mdThemingProvider.theme('default')
            .primaryPalette('regimePurple')
            .accentPalette('regimeGreen');

    })

.factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
    return {
        // Add authorization token to headers
        request: function(config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
            if (response.status === 401) {
                $location.path('/login');
                // remove any stale tokens
                $cookieStore.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})

.run(function($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
        Auth.isLoggedInAsync(function(loggedIn) {
            if (next.authenticate && !loggedIn) {
                event.preventDefault();
                $location.path('/login');
            }
        });
    });
});
