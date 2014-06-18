var controllers = angular.module('demoControllers',[]);

var fake = [
	{
		key: 'pH',
		value: '12pH'
	},
	{
		key: 'ORP',
		value: '1200mV'
	},
	{
		key: 'Conductivity',
		value: '100,000μS/cm'
	},
	{
		key: 'DO',
		value: '15mg/L'
	},
	{
		key: 'Temp',
		value: '28 C'
	}
];


controllers.controller('MetersController', ['$rootScope','$scope', '$http',
	function($rootScope, $scope, $http){

		$rootScope.active = 'meters';

		$scope.measurements = [];
		$scope.connecting = true;
		$scope.connected = false;

		function read_sensor() {
			var url = $rootScope.smartbottle.address + '/measurements';
			$http.get(url).then(function(response) {
				console.log('response ' + response.data);
			});
		}

		$scope.saveMeasurements = function() {
			console.log('saving ', $rootScope.smartbottle, $scope.measurements);
		} ;
	}
]);

controllers.controller('SettingsController', ['$rootScope', '$scope', '$http',
    function($rootScope, $scope, $http) {
	    $rootScope.active = 'settings';

		$scope.saveSettings = function() {
			console.log('saved new settings', $scope.smartbottle);
		};
    }
]);