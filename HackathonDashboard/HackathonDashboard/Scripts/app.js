
var routerApp = angular.module('routerApp', ['ui.router']);

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
                        templateUrl: 'Scripts/apps/views/team-detail.html'                        
                    },
                    'trickers@home': {
                        templateUrl: 'Scripts/apps/views/team-list.html',
                        controller: 'trickerCrtl'
                    }
                }               
            });
});




