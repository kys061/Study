angular.module("app", ["ngRoute"])

       .config(function($routeProvider){
         $routeProvider.when('/',{
           templateUrl:"templates/app.html",
           controller:"AppCtrl",
           resolve: {
             app: function($q, $timeout){
               var defer = $q.defer();
               $timeout(function(){
                 defer.resolve();
               }, 2000);
               return defer.promise;

             }
           }
         })
       })

       .controller("AppCtrl", function($scope, $q){

         $scope.model = {
           message: "This is my app!!"
         }
       })
