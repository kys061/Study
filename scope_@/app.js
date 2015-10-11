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
                flavor:"@"  //flavor를 어트리뷰트로 사용하겠다.
            },
            template: '<div>{{flavor}}</div>'
//            link: function (scope, iElement, iAttrs) {
//              scope.flavor = iAttrs.flavor;   
//            }
          };
        }])