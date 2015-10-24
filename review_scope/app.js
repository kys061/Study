angular.module("phoneApp", ["ui.router"])


.config(function config($stateProvider){
  $stateProvider.state("index", {
    url: "",
    controller: "AppCtrl as appctrl",
    templateUrl: "templates/first.html"
  })
})


.controller("AppCtrl", function() {
  var appctrl = this;
  appctrl.leaveVoicemail = function(number, message) {
    alert("Number: " + number + " said: " + message);
  };
})

.directive("phone", function() {
  return {
    restrict: "E",
    scope: {  // phone 엘리먼트에서 사용되는 프로퍼티
      number: "@",
      network: "=",
      makeCall: "&"
    },
    template: '<div class="panel">Number: {{number}} Network:'+
    '<select ng-model="network" ng-options="net for net in networks">' +
    '<input type="text" ng-model="value">' +
    '<div class="button" ng-click="makeCall({number: number, message: value})">Call home!</div></div>',
    // makecall은 폰의 프로퍼티(속성)이지만, firts.html에서 phone엘리먼트를 사용할 때
    // makecall 프로퍼티를 컨트롤러의 함수와 맵핑을 시키고 phone디렉티브가 가지는 number와 value
    // 즉, 변수값이면서 속성(프로퍼티)인 값들을 매개변수로 넣어줌으로서 컨트롤러 함수가 호출 되도록 유도하는 디렉티브이다.

    link: function(scope) {
      scope.networks = ["Verizon", "AT&T", "Sprint"];
      scope.network = scope.networks[0];
    }
  };
})
