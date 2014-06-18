
var demoApp = angular.module('demoApp',['ngRoute', 'demoControllers']);

demoApp.config(function($routeProvider){
    $routeProvider
        .when('/users', {
            controller: 'UsersController',
            templateUrl: 'partials/users.html'
        })
        .when('/payment',{
            controller: 'PaymentController',
            templateUrl: 'partials/payment.html'
        })
        .when('/user/:email_address/checks', {
            controller: 'ChecksController',
            templateUrl: 'partials/checks.html'
        })
        .otherwise({
            redirectTo:'/users'
        });
});
