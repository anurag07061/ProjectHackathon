
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (typeof (current) !== 'undefined') {
            $templateCache.remove(current.templateUrl);
        }
    });
});

routerApp.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    '': {
                        templateUrl: 'Scripts/apps/views/main-home.html'
                    },
                    'tricker-details@home': {
                        templateUrl: 'Views/Home/Status.cshtml'
                    },
                    'trickers@home': {
                        templateUrl: 'Scripts/apps/views/team-list.html',
                        controller: 'trickerCrtl'
                    }
                }
            })
            .state('teamDetails', {
                url: '/teamDetails',
                templateUrl: 'Scripts/apps/views/team-detail.html',
                controller: 'teamCrtl'
            });
    
});




