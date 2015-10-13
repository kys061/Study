angular.module("phoneApp", ["ui.router"])


        .config(function config($stateProvider){
            $stateProvider.state("index", {
              url: "",
              controller: "AppCtrl as App",
              templateUrl: "templates/first.html"
            })
        })


        .controller('AppCtrl', ['$scope', function ($scope) {
            this.sayHi = function(){
              alert("hi")
            }

            return $scope.AppCtrl = this;
        }])

        .directive('phone', [function () {
          return {
            restrict: 'A',
            scope: {
                dial:"&"  //
            },
            template: '<input type="text" ng-model="value" />' +
            '<div class="btn btn-default" ng-click="dial({message:value})">Call home</div>',

            link: function (scope, iElement, iAttrs) {
              console.log(scope);
            }
          };
        }])
