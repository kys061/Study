angular.module("app", ["ui.router"])

        .config(function config($stateProvider){
            $stateProvider.state("index", {
              url: "",
              controller: "FirstCtrl as first",
              templateUrl: "templates/first.html"
            })

/*
            $stateProvider.state("second", {
              url: "/second",
              controller: "SecondCtrl as second",
              templateUrl: "templates/second.html"
            })
*/

        })
        .filter('reverse', function(Data){
          return function (text){
            return text.split("").reverse().join("") + " | " + Data.message;
          }
        })
        .service("greeting", function Greeting(){
          var greeting = this;
          greeting.message = "";
        })

        .factory("Data", function(){
          return { message: "Data of factory" }

        })

        .controller("FirstCtrl", function FirstCtrl($scope, greeting, Data){
            var first = this;
            first.greeting = greeting;

            $scope.data = Data;
            $scope.reversedMessage = function(message){
              return message.split("").reverse().join("");
            }
        })


        .controller("SecondCtrl", function SecondCtrl($scope, greeting, Data){
            var second = this;
            second.greeting = greeting;
            $scope.data = Data;

        })
