'use strict';

//Controller
var cryptoCtrl = angular.module('cryptoCtrl',[]);
var label = 'Crypto';

//Dashboard
cryptoCtrl.controller('dashboardCtrl',['$scope','dataCurrency','$timeout',function($scope,dataCurrency,$timeout){

    $scope.refreshTime = 10000;
    $scope.historyNumber = 5;
    $scope.msg = '';
    $scope.currencys = [];          //CurrentData
    
    $scope.btc_history = [];        //Tables
    $scope.eth_history = [];
    

    $scope.coinSel = 'USD';         //Selects
    $scope.cryptoSel = 'BTC';
    $scope.coin = 0;                //InputFields
    $scope.crypto = 0;

    $scope.updateCurrency = function(){

        dataCurrency.get_all()
        .success(function (data){

            $scope.status=true;
            $scope.msg = label + ' get data success.';
            $scope.currencys = data;
            var new_date = new Date();

            $scope.btc_history.push( 
                {   
                    time: new_date,
                    usd: data.BTC.USD,
                    eur: data.BTC.EUR
                } );
            $scope.eth_history.push( 
                {   
                    time: new_date,
                    usd: data.ETH.USD,
                    eur: data.ETH.EUR,
                    btc: data.ETH.BTC
                } );
            //console.log(data);

            //Performance, Delete older data
            if($scope.btc_history.length>$scope.historyNumber){
                $scope.btc_history.splice(0,1);
            }
            if($scope.eth_history.length>$scope.historyNumber){
                $scope.eth_history.splice(0,1);
            }


            $scope.updateCalculator('crypto');
            $scope.updateChart(data,new_date);

            $timeout( $scope.updateCurrency ,$scope.refreshTime);

        }).error(function(error) {
            $scope.status=error.status;
            $scope.msg = ' Cant get information from service: ' + error.msg;
            $timeout( $scope.updateCurrency ,$scope.refreshTime);
        });

    };

    //Init Loop
    $scope.updateCurrency();


    $scope.updateCalculator = function(type){

        //update crypto
        if(type=='coin')
        {
            if($scope.coinSel == 'USD' && $scope.cryptoSel == 'BTC')
            {
                console.log('Changed----');
                $scope.crypto = $scope.currencys.BTC.USD * $scope.coin;
            }else if($scope.coinSel == 'USD' && $scope.cryptoSel == 'ETH'){
                $scope.crypto = $scope.currencys.ETH.USD * $scope.coin;
            }else
            if($scope.coinSel == 'EUR' && $scope.cryptoSel == 'BTC')
            {
                $scope.crypto = $scope.currencys.BTC.EUR * $scope.coin;
            }else if($scope.coinSel == 'EUR' && $scope.cryptoSel == 'ETH'){
                $scope.crypto = $scope.currencys.ETH.EUR * $scope.coin;
            }
        }
        //update coin
        else if(type=='crypto')
        {
            if($scope.coinSel == 'USD' && $scope.cryptoSel == 'BTC')
            {
                $scope.coin = $scope.currencys.BTC.USD * $scope.crypto;
            }else if($scope.coinSel == 'USD' && $scope.cryptoSel == 'ETH'){
                $scope.coin = $scope.currencys.ETH.USD * $scope.crypto;
            }
            else
            if($scope.coinSel == 'EUR' && $scope.cryptoSel == 'BTC')
            {
                $scope.coin = $scope.currencys.BTC.EUR * $scope.crypto;
            }else if($scope.coinSel == 'EUR' && $scope.cryptoSel == 'ETH'){
                $scope.coin = $scope.currencys.ETH.EUR * $scope.crypto;
            }
        }
        
        //console.log($scope.coin);
        //console.log($scope.crypto);
    };

    $scope.initChart = function(){
        var ctx = document.getElementById("chart_area").getContext("2d");
        window.myLine = new Chart(ctx, config);
    };

    $scope.initChart();

    //Update CHART in RealTime
    $scope.updateChart = function(data,new_date){

        config.data.labels.push(new_date.getHours() + ":" + new_date.getMinutes() + ":" + new_date.getSeconds());
        config.data.datasets[0].data.push(data.BTC.USD);
        config.data.datasets[1].data.push(data.ETH.USD);

        //Performance, Delete older data
        if(config.data.labels.length>20){
            config.data.datasets[0].data.splice(0,1);
            config.data.datasets[1].data.splice(0,1);
            config.data.labels.splice(0,1);
        }

        window.myLine.update();
    };


}]); 