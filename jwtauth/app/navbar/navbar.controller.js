(function(){
'use strict';

angular.module('app')
  .controller('NavbarCtrl', function ($scope, $location, UserFactory, BoxInfoFactory) {
    var nc = this;

    $scope.logout = logout;
    $scope.isLogged = isLogged;
    // $scope.isLoggedIn = false;
    $scope.isLoggedIn = BoxInfoFactory.isLoggedIn();

    console.log($scope.isLoggedIn);

    function logout(){
      UserFactory.logout();
      // $scope.user = null;
      $scope.isLoggedIn = BoxInfoFactory.isLoggedIn();
      $location.path('#/login');
    }

    function isLogged(){
      $scope.isLoggedIn = BoxInfoFactory.isLoggedIn();
      return $scope.isLoggedIn;
    }

});
})();
