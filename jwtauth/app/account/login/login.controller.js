'use strict';

angular.module('app')

  .controller('LoginCtrl', function($scope, $location, UserFactory, AuthUserFactory){

    $scope.user = {};

    $scope.login = login;
    $scope.logout = logout;
    $scope.getUserName = getUserName;

    // initialization
    UserFactory.getUser().then(function sucess(response){
      $scope.user = response.data.user;
    })

    function login(username, password){
      UserFactory.login(username, password).then(function success(response){
        $scope.user = response.data.user;
          $location.path('');
        // console.log(response);
      }, handleError);
    }

    function logout(){
      UserFactory.logout();
      $scope.user = null;
      $location.path('#/login');
    }

    function getUserName(){
      return $scope.user;
    }

    function handleError(response){
      alert('Error' + response.data)
      console.log(response);
    }

  })

  .factory('UserFactory', function UserFactory($http, API_URL, API_URL_BOXINFO, AuthTokenFactory, AuthUserFactory, $q){
    'use strict';
    var UserFactory = this;
      UserFactory.users = {};

    return {
      login: login,
      logout: logout,
      getUser: getUser
    }

    function login(username, password){
      return $http.post(API_URL_BOXINFO + '/login', {
        username: username,
        password: password
      }).then(function success(response) {
        AuthTokenFactory.setToken(response.data.token);
        AuthUserFactory.setUser(response.data.user.username);
         UserFactory.users = response.data.user;
        console.log(UserFactory.users);
        return response;
      })
    }

    function logout(){
      AuthTokenFactory.setToken();
    }

    function getUser() {
      if (AuthTokenFactory.getToken()) {
          return UserFactory.users;
      }else {
        return $q.reject({ data: 'client has no auth token '});
      }
    }

  })

  .service('Users', function Users(UserFactory) {
    var Users = this;

    Users.user = {};



  })
