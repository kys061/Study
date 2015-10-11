angular.module("superApp", ["ui.router"])


        .config(function config($stateProvider){
            $stateProvider.state("index", {
              url: "",
              //controller: "AppCtrl as App",
              templateUrl: "templates/first.html"
            })
        })

        .directive("superhero", function(){
          return {
            restrict: "E",   // 지시자를 엘리먼트로 선언
            // 스코프를 isolate로 변경 - 해당 지시자를 사용할 때마다 복제가 생김. 공유하지 않음
            scope: {},  
            // 다른 지시자가 superhero지시자와 통신 하기 위한 컨트롤러 API 
            controller: function($scope) {
              $scope.abilities = [];

              this.addStrength = function(){
                $scope.abilities.push("strength")
                console.log("1 addStrength" + $scope);
              }
              this.addSpeed = function(){
                $scope.abilities.push("Speed")
                console.log("2 addSpeed" + $scope);
              }
              this.addFlight = function(){
                $scope.abilities.push("Flight")
                console.log("3 addFlight" + $scope);
              }
              console.log($scope.abilities);
            },


            link: function(scope, element){    //  you can use link: function(){} and default of directive is A(attribute)
                element.bind("mouseenter", function(){
                  element.addClass("button");
                  console.log(scope.abilities);
                  console.log("4" + scope);
              })
            }
          }
        })

        .directive("strength", function () {
          return {
              require: "superhero",  // 다른 지시자를 사용하고 싶을 때 require로 선언

        // 4번 째 파라미터에 지정되어있는 것은 require에 선언된 지시자의 컨트롤러를 파라미터로 전달 한다   
              link: function(scope, element, attrs, superheroCtrl){  
                superheroCtrl.addStrength();
                console.log("5 addStrength" + scope);
              }   
          }
        })

        .directive("speed", function () {
          return {
              require: "superhero",

              link: function(scope, element, attrs, superheroCtrl){
                superheroCtrl.addSpeed();
                console.log("6 addSpeed" + scope);
              }   
          }
        })

        .directive("filght", function () {
          return {
              require: "superhero",

              link: function(scope, element, attrs, superheroCtrl){
                superheroCtrl.addFlight();
                console.log("7 addFlight" + scope);
              }   
          }
        })
