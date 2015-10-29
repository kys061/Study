'use strict';

angular.module('app')
  .factory('AuthUserFactory', function AuthUserFactory($window){
    'use strict';

    var store = $window.localStorage;
    var key = 'user-id';

    return {
      getUser: getUser,
      setUser: setUser
    }

    function getUser(){
      return store.getItem(key);
    }

    function setUser(username){
      if(username){
        store.setItem(key, username);
      }
      else {
        store.removeItem(key);
      }
    }

  })
