angular.module("app", ["ui.router"])


        .config(function config($stateProvider){
            $stateProvider.state("index", {
              url: "",
              //controller: "AppCtrl as App",
              templateUrl: "templates/first.html"
            })
        })

      //  .controller('AppCtrl', ['$scope', function ($scope) {
      //  }])
// 엘리먼트 디렉티브는 속성을 가질 수 있는데, 그 속성은 변수가 될 수 있다. 아래와 같이 title처럼,
// 그리고 그 변수를 태그(zippy)의 속성으로 사용하면서, 그 속성에 값을 넣어 줄 수 있다.
//
        .directive("zippy", [function () {
          return {
            restrict: "E",
            transclude: true,
            scope: {
              title:"@"
            },
            templateUrl: 'templates/zippy.html',

            link: function (scope) {
              scope.isContentVisible = false;
              scope.toggleContent = function () {
                scope.isContentVisible = !scope.isContentVisible;
                console.log(scope.isContentVisible);
              }
            }
          };
        }])
