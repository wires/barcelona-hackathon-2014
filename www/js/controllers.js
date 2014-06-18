var controllers = angular.module('demoControllers',[]);

function humanize(nr)
{
    steps = [
        ['T', Math.pow(10, 12)],
        ['G', Math.pow(10, 9)],
        ['M', Math.pow(10, 6)],
        ['K', Math.pow(10, 3)]
    ];

    for(var step in steps)
        if (nr > steps[step][1])
            return (nr / steps[step][1]).toFixed(0) + ' ' + steps[step][0];

    return nr.toFixed(0);
}

controllers.controller('MetersController', ['$rootScope','$scope', '$http',
	function($rootScope, $scope, $http){

		$scope.measurements = [
			{
				key: 'pH',
				value: '12pH'
			},
//			{
//				key: 'ORP',
//				value: '1200mV'
//			},
//			{
//				key: 'Conductivity',
//				value: '100,000μS/cm'
//			},
//			{
//				key: 'DO',
//				value: '15mg/L'
//			},
			{
				key: 'Temp',
				value: '28 C'
			}
		];

		$scope.saveMeasurements = function() {
			console.log('saving ', $rootScope.smartbottle, $scope.measurements);
		} ;
	}
]);

controllers.controller('SettingsController', ['$rootScope', '$scope', '$http',
    function($rootScope, $scope, $http) {

	    $rootScope.smartbottle = {
		    address: '127.0.0.1'
	    };

		$scope.address = $rootScope.smartbottle.address;

		$scope.saveSettings = function() {
			$rootScope.smartbottle.address = $scope.address;
		};
    }
]);