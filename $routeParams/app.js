angular.module("app", ["ngRoute"])

.config(function($routeProvider) {
    $routeProvider
      .when('/map/:country/:state/:city',
      {
        templateUrl: "app.html",
        controller: "AppCtrl as main"
      })
})

.controller("AppCtrl", function($routeParams) {
    var main = this;
    main.model = {
        message: "Address: " +
          $routeParams.country + ", " +
          $routeParams.state + ", " +
          $routeParams.city + ", "
    }
})
