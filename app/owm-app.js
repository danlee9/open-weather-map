angular.module('OWMApp', ['ngRoute'])
	.value('owmCities', ['New York', 'Dallas', 'Chicago'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'HomeCtrl'
		})
		.when('/cities/:city', {
			templateUrl: 'city.html',
			controller: 'CityCtrl',
			controllerAs: 'cityCtrl',
			resolve: {
				city: function(owmCities, $route, $location) {
					var city = $route.current.params.city;
					city = city.replace('_',' ');
					if(owmCities.indexOf(city) == -1) {
						$location.path('/error');
						return;
					}
					return city;
				}
			}
		})
		.when('/error', {
			template: '<p>Error - Page not found</p>'
		})
		.otherwise('/error');
	}])
	.controller('HomeCtrl', [function(){
		//Empty so far
	}])
	.controller('CityCtrl', ['city', function(city){
		var self = this;
		self.city = city;
	}])
	.run(function($rootScope, $location, $timeout) {
	    $rootScope.$on('$routeChangeError', function() {
	        $location.path("/error");
	    });
	    $rootScope.$on('$routeChangeStart', function() {
	        $rootScope.isLoading = true;
	    });
	    $rootScope.$on('$routeChangeSuccess', function() {
	      $timeout(function() {
	        $rootScope.isLoading = false;
	      }, 1000);
	    });
	});