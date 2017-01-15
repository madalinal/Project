'use strict';

angular.module('dashboardApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.names =[];

    $scope.list = function () {
      $http.get('/api/googledrive/listFile')
        .then(function (success) {
          $scope.files = success.data[0].name;
        }, function (error) {
          console.log('Eroare')
        });
    };

    $scope.listTen = function () {
      $http.get('/api/googledrive/listFiles')
        .then(function (success) {
          var filesTen = success.data;
          for (var i = 0; i < filesTen.length; i++) {
            var file = filesTen[i];
            $scope.names[i] = file.name;
          }
        }, function (error) {
          console.log('Eroare')
        });
    };

    $scope.upload = function () {
        $scope.file = $('#uploadedFile')[0].files[0];
      $scope.size = $scope.file.size;
        var name = $scope.file.name;
        var type = $scope.file.type;
        var type1 = type.split("/",2);
        var typeparam1 = type1[0];
        var typeparam2 = type1[1];
        $scope.create($scope.file, name, typeparam1, typeparam2);
    };


    $scope.create = function ( file, name, typeparam1, typeparam2) {
      var dStart = new Date();
      var nStart = dStart.getTime();
      $http.get('/api/googledrive/createFiles/'+ file +'/' + name + '/' + typeparam1 + '/' + typeparam2)
        .then(function (success) {
          $scope.timp = success.data;
          $scope.dimensiune = success.status;
          var d = new Date();
          var n = d.getTime();
          $scope.latenta = n-nStart;

        }, function (error) {
          console.log('Eroare')
        });
    }

  });
