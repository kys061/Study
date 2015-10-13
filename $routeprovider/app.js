angular.module("app", ["ngRoute"])

       .config(function($routeProvider){
         $routeProvider.when('/',{
           templateUrl:"templates/app.html",
           controller:"AppCtrl"
         })
       })

       .controller("AppCtrl", function($scope){
         $scope.model = {
           message: "This is my app!!"
         }
       })
