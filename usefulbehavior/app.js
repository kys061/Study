angular.module("behaviorApp", ["ui.router"])


        .config(function config($stateProvider){
            $stateProvider.state("index", {
              url: "",
              //controller: "AvengersCtrl as Avengers",
              templateUrl: "templates/first.html"
            })
        })


        .directive("enter", function(){
          return function(scope, element, attrs){    //  you can use link: function(){} and default of directive is A(attribute)
              element.bind("mouseenter", function(){
                  element.addClass(attrs.enter);
              })
          }
        })

        .directive("leave", function(){
          return function(scope, element, attrs){    //  you can use link: function(){} and default of directive is A(attribute)
              element.bind("mouseleave", function(){
                element.removeClass(attrs.enter);
              })
          }
        })
