var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
      .when('/',
      {
        templateUrl: "templates/app.html",
        controller: "AppCtrl as main",
        resolve: {
            loadData: appCtrl.loadData,
            prepData: appCtrl.prepData
        }
      })
});

var appCtrl = app.controller("AppCtrl", function($route) {
    console.log($route);
    var main = this;
    main.model = {
        message: "I'm a great app!"
    }
});

appCtrl.loadData = function($q, $timeout) {
    var defer = $q.defer();
    $timeout(function() {
        defer.resolve("loadData");
    }, 2000);
    return defer.promise;
}

appCtrl.prepData = function($q, $timeout) {
    var defer = $q.defer();
    $timeout(function() {
        defer.resolve("prepData");
    }, 2000);
    return defer.promise;
}
