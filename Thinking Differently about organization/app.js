angular.module("phoneApp", ["ui.router"])

var phoneAppStuff ={}


phoneAppStuff.configs = {}
phoneAppStuff.configs.index = function($stateProvider){
  $stateProvider.state("index", {
    url: "",
    controller: "AppCtrl as App",
    templateUrl: "templates/first.html"
  })
}

phoneAppStuff.controllers = {}
phoneAppStuff.controllers.AppCtrl = function ($scope){
  this.sayHi = function(){
    alert("hi")
  }

  return $scope.AppCtrl = this;
}

phoneAppStuff.directives = {}
phoneAppStuff.directives.phone = function () {
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
}

.config(phoneAppStuff.configs)
.controller(phoneAppStuff.controllers)
.directive(phoneAppStuff.directives)
