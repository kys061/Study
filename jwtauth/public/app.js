(function () {
  'use strict';
  angular
  .module('app', ["ui.router", "ngRoute"], function config($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })

  .config(function config($stateProvider, $urlRouterProvider){
    $stateProvider.state("index", {
      url: "/",
      controller: "MainCtrl as vm",
      templateUrl: "template/boxinfo.html"
    });
    $urlRouterProvider
      .otherwise('/');
    $stateProvider.state("login", {
      url: "/login",
      controller: "MainCtrl as vm",
      templateUrl: "template/login.html"
    });
  })

  .constant('API_URL', 'http://localhost:10000')
  .constant('API_URL_BOXINFO', 'http://localhost:3000')

  .controller('MainCtrl', function MainCtrl(RandomUserFactory, UserFactory, BoxInfoFactory, $route, $state, $location) {
    'use strict';
    var vm = this;


    vm.isGetting = false;
    vm.isCreating = false;
    vm.isLogining = false;
    vm.isLoggedIn = false;
    vm.currentUser = { rights: [] };
    vm.setAdmin = setAdmin;
    vm.resetAdmin = resetAdmin;
    vm.startLogining = startLogining;
    vm.startGetting = startGetting;
    vm.cancelGetting = cancelGetting;
    vm.startCreating = startCreating;
    vm.cancelCreating = cancelCreating;
    vm.getRandomUser = getRandomUser;
    vm.getBoxinfo = getBoxinfo;
    vm.login = login;
    vm.logout = logout;
    vm.reload = reload;
    // initialization
    UserFactory.getUser().then(function sucess(response){
      vm.user = response.data;
    })
    BoxInfoFactory.getBoxinfo().then(function sucess(response){
      vm.boxinfo = response.data;
      vm.isLoggedIn = BoxInfoFactory.isLoggedIn();
    })


    function reload() {
      $state.transitionTo('index');
    }

    function setAdmin() {
      resetAdmin();
      vm.currentUser.rights.push('islogin');
    }

    function resetAdmin() {
      vm.currentUser.rights = [];
    }

    function startLogining() {
      if(vm.isLogining == false) {
        vm.isLogining = true;
      }
      else {
        vm.isLogining = false;
      }
    }

    function startGetting() {
      vm.isGetting = true;
      // vm.isEditing = false;
      // resetCreateForm();
    }
    function cancelGetting() {
      vm.isCreating = false;
    }

    function startCreating() {
      vm.isCreating = true;
    }
    function cancelCreating() {
      vm.isCreating = false;
    }

    function getRandomUser() {
      RandomUserFactory.getUser().then(function success(response) {
        vm.randomUser = response.data;
      }, handleError);
    }

    function getBoxinfo() {
      BoxInfoFactory.getBoxinfo().then(function success(response) {
        vm.boxinfo = response.data;
      }, handleError);
    }

    function login(username, password){
      UserFactory.login(username, password).then(function success(response){
        vm.user = response.data.user;
          $location.path('');
        // console.log(response);
      }, handleError);
    }

    function logout(){
      UserFactory.logout();
      vm.user = null;
      $location.path('#/login');
    }

    function handleError(response){
      alert('Error' + response.data)
      console.log(response);
    }

  })

  .filter('user', function(){
  var rules = {
    isAdmin: function(user){
      return user.rights.indexOf('admin') !== -1;
    },
    isntAdmin: function(user){
      return !rules.isAdmin(user);
    }
  };

  return function(user, rule){
    return rules[rule](user);
  };
})


  .factory('BoxInfoFactory', function BoxInfoFactory($http, API_URL_BOXINFO, AuthTokenFactory){
    'use strict';
    return {
      getBoxinfo: getBoxinfo,
      isLoggedIn: isLoggedIn
    }

    function getBoxinfo() {
      return $http.get(API_URL_BOXINFO + '/boxinfo');
    }

    function isLoggedIn() {
      if (AuthTokenFactory.getToken()) {
        return true;
      } else {
        return false;
      }
    }


  })

  .factory('RandomUserFactory', function RandomUserFactory($http, API_URL, API_URL_BOXINFO) {
    'use strict';
    return {
      getUser: getUser
    };

    function getUser() {
      return $http.get(API_URL + '/random-user');
    }
  })

  .factory('UserFactory', function UserFactory($http, API_URL, API_URL_BOXINFO, AuthTokenFactory, $q){
    'use strict';

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
        return response;
      });;
    }

    function logout(){
      AuthTokenFactory.setToken();
    }

    function getUser() {
      if (AuthTokenFactory.getToken()) {
        return $http.get(API_URL_BOXINFO + '/me');

      }else {
        return $q.reject({ data: 'client has no auth token '});
      }
    }

  })

  .factory('AuthTokenFactory', function AuthTokenFactory($window){
    'use strict';

    var store = $window.localStorage;
    var key = 'auth-token';

    return {
      getToken: getToken,
      setToken: setToken
    }

    function getToken(){
      return store.getItem(key);
    }

    function setToken(token){
      if(token){
        store.setItem(key, token);
      } else {
        store.removeItem(key);
      }
    }

  })

  .factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory){
    'use strict';
    return {
      request: addToken
    };

    function addToken(config){
      var token = AuthTokenFactory.getToken();
      if (token) {
        // console.log(config.headers);
        config.headers = config.headers || {};
        // console.log(config.headers);
        config.headers.Authorization = 'Bearer ' + token;
        // console.log(config.headers);
      }
      return config;
    }
  })
})();
