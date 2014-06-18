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
			$scope.status = 'attempting to get measurement';
			var url = 'http://' + $rootScope.smartbottle.address + '/measurement';
			return $http({method: 'GET', url: url}).
				success(function(data, status, headers, config, statusText) {
					$scope.connecting = false;

					var m = [];
					for (var key in data['probe.data']) {
						var o = {
							key: key,
							value: data['probe.data'][key]
						};

						m.push(o);
					};

					$scope.measurements = m;

					setTimeout(read_sensor, 2000);
				}).
				error(function(data, status, headers, config, statusText) {
					$scope.connecting = true;
				});

		};

		$scope.saveMeasurements = function() {
			read_sensor();
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