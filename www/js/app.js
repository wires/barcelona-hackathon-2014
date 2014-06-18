
var demoApp = angular.module('demoApp',['ngRoute', 'demoControllers']);

demoApp.config(function($routeProvider){
    $routeProvider
        .when('/meters', {
            controller: 'MetersController',
            templateUrl: 'partials/meters.html'
        })
        .when('/settings', {
            controller: 'SettingsController',
            templateUrl: 'partials/settings.html'
        })
        .otherwise({
            redirectTo:'/meters'
        });
});
