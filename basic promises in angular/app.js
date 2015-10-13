angular.module("app", ["ngRoute"])

       .config(function($routeProvider){
         $routeProvider.when('/',{
           templateUrl:"templates/app.html",
           controller:"AppCtrl"
         })
       })

       .controller("AppCtrl", function($scope, $q){
         var defer = $q.defer();

         defer.promise.then(function(weapon){
           alert("you can have my" + weapon)

           return "bow"
         })

// if resolve is success, resolve method move on next things(then) to the next steps.
         defer.resolve("sword");

         $scope.model = {
           message: "This is my app!!"
         }
       })
