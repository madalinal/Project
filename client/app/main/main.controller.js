'use strict';

angular.module('dashboardApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.names =[];
    $scope.latenta =[];
    $scope.size =[];
    $scope.files =[];
    $scope.filesUploaded = []

    $scope.list = function () {
        $http.get('/api/googledrive/listFile/' +  $scope.filesUploaded.length)
          .then(function (success) {
            $scope.files = success.data;

          }, function (error) {
            console.log('Eroare')
          });

    };

    $scope.listTen = function () {
      $http.get('/api/googledrive/listFiles')
        .then(function (success) {
          $scope.filesTen = success.data;
          for (var i = 0; i < $scope.filesTen.length; i++) {
            var file = $scope.filesTen[i];
            $scope.names[i] = file.name;
          }
        }, function (error) {
          console.log('Eroare')
        });
    };

    $scope.upload = function () {
      $scope.filesUploaded= $('#uploadedFile')[0].files;
      for (var i = 0; i < $scope.filesUploaded.length; i++) {
        $scope.file = $('#uploadedFile')[0].files[i];
        $scope.size[i] = $scope.file.size;
        var name = $scope.file.name;
        var type = $scope.file.type;
        var type1 = type.split("/",2);
        var typeparam1 = type1[0];
        var typeparam2 = type1[1];
        $scope.files = [];
        $scope.names = [];
        $scope.create(i, $scope.file, name, typeparam1, typeparam2);
      }
    };


    $scope.create = function (index, file, name, typeparam1, typeparam2) {
      var dStart = new Date();
      var nStart = dStart.getTime();
      $http.get('/api/googledrive/createFiles/'+ file +'/' + name + '/' + typeparam1 + '/' + typeparam2)
        .then(function (success) {
          $scope.timp = success.data;
          $scope.dimensiune = success.status;
          var d = new Date();
          var n = d.getTime();
          $scope.latenta[index] = n-nStart;
          $scope.open();
        }, function (error) {
          console.log('Eroare')
        });
    };


    $scope.open = function() {
      $scope.showModal = true;
    };


  });
