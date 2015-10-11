angular.module("app", ["ui.router"])

        .config(function config($stateProvider){
            $stateProvider.state("index", {
              url: "",
              controller: "AvengersCtrl as Avengers",
              templateUrl: "templates/first.html"
            })
        })

        .factory('Avengers', function () {
          var Avengers = {};

          Avengers.cast =[
            {
              name: "Clark Gregg",
              character: "Agent Phil Coulson"
            },
            {
              name: "Cobie Smulder",
              character: "Agent Maria Hill"
            },
            {
              name: "강윤수",
              character: "슈퍼맨"
            },
            {
              name: "임미양",
              character: "캣우먼"
            },
            {
              name: "강시온",
              character: "귀요미"
            },
            {
              name: "Clark Gregg",
              character: "Agent Phil Coulson"
            },
            {
              name: "Clark Gregg",
              character: "Agent Phil Coulson"
            }
          ];

          return Avengers;

        })
        
        .controller("AvengersCtrl", function AvengersCtrl($scope, Avengers){
          $scope.avengers = Avengers;
        })
