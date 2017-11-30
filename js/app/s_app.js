// Factory/Services

angular.module('testApp')
    .factory('dataCurrency', ['$http', function($http) {

    var urlBase = 'https://min-api.cryptocompare.com/data/';
    var dataCurrency = {};

    //.........Actions...........
    
    dataCurrency.get_all = function () {
        return $http.get( urlBase + 'pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR,BTC' );
    };

  
    return dataCurrency;
}]);