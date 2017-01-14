'use strict';

angular.module('dashboardApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $scope.list = function () {
      $http.get('/api/googledrive/listFiles')
        .success(function(req, res) {
          $scope.files = res;
          console.log('Succes')
        }).error(
        console.log('Eroare')
      )
    };
    $scope.create = function () {
      $http.get('/api/googledrive/createFiles')
        .success(function() {
          console.log('Succes')
        }).error(
        console.log('Eroare')
      )
    }
  });
