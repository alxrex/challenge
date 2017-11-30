'use strict';

var site_url = 'http://localhost/challengeBTC/'
var template_url = 'http://localhost/challengeBTC/template/'

  var testApp =  angular.module("testApp",
    ['ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'angular.filter', 'cryptoCtrl']);

	//----Routing & multiples Views
  	testApp.config(['$routeProvider',
      function($routeProvider){
  			$routeProvider
          .when('/dashboard/',{
            templateUrl: template_url+'cryptocurrency/dashboard.html',
            controller: 'dashboardCtrl'
          })
          .otherwise({
  					redirectTo: '/dashboard/'
  				});
  	}]);


//Fix IE clear cache
/*testApp.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);
*/