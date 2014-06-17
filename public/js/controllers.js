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

function uptime(count, interval) {
    return ((count * interval) / (60*60*24))
}

controllers.controller('UsersController', ['$scope', '$http',
    function($scope, $http) {

        $scope.cps = 0;
        $scope.users = [];

        $http.get('/config/environment')
            .then(function(res){
                $scope.environment = res.data;
            });

        $http.get('/users')
            .then(function(users){
                $scope.users = users.data.map(function(user){
                    user.pings = user.pings && humanize(user.pings);
                    user.credits = user.credits && user.credits.toFixed(3);
                    return user;
                });
                
                $scope.users.forEach(function(user){
                    $http
                        .get('/user/' + user.email + '/check_count')
                        .then(function(count){
                            user.count = count.data;
                            $scope.cps += count.data.frequency;
                        });
                });
            });

        $scope.addUser = function(){
            // push a new user object
            $scope.users.push({
                name: $scope.newUser.name,
                email: $scope.newUser.email
            });
        };
    }
]);

var DAY = 60 * 60 * 24;
var PING_COST = 100000 * .995;

controllers.controller('ChecksController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {

        $scope.user = {
            email: $routeParams.email_address
        };

        $scope.checks = [];

        $http.get('/user/' + $scope.user.email + '/checks')
            .then(function(checks){
                $scope.checks = checks.data.map(function(check){
                    check.uptime = uptime(check.nr_recent_ups, check.interval);
                    check.downtime = uptime(check.nr_recent_downs, check.interval);
                    check.daily_frequency = DAY / check.interval;
                    var enabled = Number(check.enabled) ? 1 : 0;
                    var n = check.locations ? check.locations.length : 0;
                    var c = (check.daily_frequency * 30.5) * n;
                    check.monthly_cost = (enabled * c / PING_COST).toFixed(2);
					check.enabled = enabled ? 'running' : 'pause';
					check.locations = check.locations.map(function(loc){
						return loc
							.replace(/-/,'_')
							.replace(/-/,'')
							.replace('west','w')
							.replace('east','e')
							.replace('amsterdam','a')
							.replace('sanfrancisco','sf')
							.toUpperCase();
					});
                    return check;
                });
            });
    }
]);


// helper function that serializes a form
function serializeForm(element) {
    var form = {};
    for ( var i = 0; i < element.elements.length; i++ ) {
        var e = element.elements[i];
        switch(e.name){
            // only take the elements with this name
            case 'number':
            case 'cvv':
            case 'exp_month':
            case 'exp_year':
                form[e.name] = e.value;
//                kvpairs.push(
//                    encodeURIComponent(e.name) + "=" +
//                        encodeURIComponent(e.value));
        }
    }

    return form;//kvpairs.join("&");
}

controllers.controller('PaymentController', ['$scope','$http',
    function($scope, $http) {

        // offered units of purchase
        $scope.units = [
            {amount: 5, label: '$5'},
            {amount: 10, label: '$10'},
            {amount: 20, label: '$20'},
            {amount: 30, label: '$30'},
            {amount: 40, label: '$40'},
            {amount: 50, label: '$50'},
            {amount: 100, label: '$100'},
            {amount: 200, label: '$200'}
        ];

        $scope.credits = 0;

        // first amount is default
        $scope.amount = $scope.units[0].amount;

        $scope.performingSale = false;
        $scope.purchase = function() {
            $scope.performingSale = true;

            // perform braintree voodoo
            var bt = 'braintree-payment-form';
            braintree.encryptForm(bt);

            // pull out the data
            var element = document.getElementById(bt);

            var data = serializeForm(element);

            $http.post('/payments/' + $scope.amount, data)
                .success(function(data){
                    console.log(data);
                    $scope.credits += parseFloat(data.amount)
                    $scope.response = data.response;
                    $scope.performingSale = false;
                });
        }
    }
]);
