angular.module("twitterApp", ["ui.router"])


        .config(function config($stateProvider){
            $stateProvider.state("index", {
              url: "",
              controller: "AppCtrl as App",
              templateUrl: "templates/first.html"
            })
        })

        .controller("AppCtrl", function($scope){
            $scope.loadMoreTweets = function(){
              console.log("Loading tweets!")
            }

            $scope.DeleteTweets = function(){
              console.log("deleting tweets!")
            }
        })

        .directive("enter", function(){
          return function(scope, element, attrs){    //  you can use link: function(){} and default of directive is A(attribute)
              element.bind("mouseenter", function(){
                scope.$apply(attrs.enter)
            })
          }
        })
