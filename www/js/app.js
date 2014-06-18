
var demoApp = angular.module('demoApp',['ngRoute', 'demoControllers']);

demoApp.run(function($rootScope){
	$rootScope.smartbottle = {
		address: '127.0.0.1'
	};
	$rootScope.active = 'meters'
	$rootScope.showingMenu = false;

	$rootScope.toggleMenu = function() {
		$rootScope.showingMenu = !$rootScope.showingMenu;
	}

});

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
