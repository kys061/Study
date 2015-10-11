angular.module("drinkApp", ["ui.router"])


        .config(function config($stateProvider){
            $stateProvider.state("index", {
              url: "",
              controller: "AppCtrl as App",
              templateUrl: "templates/first.html"
            })
        })

        .controller('AppCtrl', ['$scope', function ($scope) {
            $scope.ctrlFlavor = "blackberry";
        }])

        .directive('drink', [function () {
          return {
            restrict: 'A',
            scope: {
                flavor:"="  //
            },
            template: '<input type="text" ng-model="flavor"/><div>Directive : {{flavor}}</div>'
//            link: function (scope, iElement, iAttrs) {
//              scope.flavor = iAttrs.flavor;   
//            }
          };
        }])