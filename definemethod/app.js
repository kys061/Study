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

        .service("greeting", function Greeting(){
          var greeting = this;
          greeting.message = "";
        })

        .factory("Data", function(){
          return { message: " Im data from a service" }

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
