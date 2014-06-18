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

		function read_sensor() {
			console.log('attempting to get measurement');
			var url = 'http://' + $rootScope.smartbottle.address + '/measurements';
			$http({method: 'GET', url: url}).
				success(function(data, status, headers, config, statusText) {
					$scope.connecting = false;
					$scope.error = undefined;
					$scope.status = undefined;
					console.log(data);
				}).
				error(function(data, status, headers, config, statusText) {
					$scope.connecting = true;
					$scope.error = data
					$scope.status = statusText;
				});

		}

		setInterval(read_sensor, 3000);

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