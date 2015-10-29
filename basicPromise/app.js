angular.module("app", ["ngRoute"])

.config(function($routeProvider) {
    $routeProvider
      .when('/',
      {
        templateUrl: "app.html",
        controller: "AppCtrl as main"
      })
})

.controller("AppCtrl", function($q) {
    var main = this;
    var defer = $q.defer();

    defer.promise
      .then(function(weapon) {
        alert("You can have my " + weapon)

        return "bow"
      })
      .then(function(weapon) {
        alert("And my " + weapon)

        return "axe"
      })
      .then(function(weapon) {
        alert("And my " + weapon)
      });

    //defer.resolve("sword");

    main.model = {
        message: "This is my app!!!"
    }
})
