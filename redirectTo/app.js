angular.module("app", ["ngRoute"])

.config(function($routeProvider) {
    $routeProvider
      .when('/',
      {
        templateUrl: "app.html",
        controller: "AppCtrl as main"
      })
      .when('/pizza/:crust/:toppings', {
        redirectTo: function(routeParams, path, search) {
            console.log(routeParams)
            console.log(path)
            console.log(search)
            return "/" + routeParams.crust
        }
      })
      .when('/deep', {
        template: 'Deep dish'
      })
      .otherwise({
        redirectTo: "/"
      })
})

.controller("AppCtrl", function() {
    var main = this;
    main.model = {
        message: "This is my app!!!"
    }
})
