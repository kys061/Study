'use strict';

angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('boxinfo', {
        url: '/',
        templateUrl: 'boxinfo/boxinfo.html',
        controller: 'BoxinfoCtrl as bi'
      });
  })

  .controller('BoxinfoCtrl', function($scope, RandomUserFactory, TicketFactory, UserFactory, BoxInfoFactory, AuthUserFactory, $route, $state, $location){

    var bi  = this;

    $scope.user = {};
    $scope.tempboxinfo=[];
    $scope.currentPage = {
      open: 1,
      hold: 1,
      close: 1
    }
    $scope.pageSize = 3;
    $scope.type = {
      open: 'open',
      hold: 'hold',
      close: 'close'
   }

    bi.boxinfo=[];
    bi.isCreating = false;

    // function def:
    bi.UserFactory = UserFactory;
    bi.getBoxinfo = getBoxinfo;
    bi.getTicket = getTicket;
    bi.logout = logout;
    bi.isLogged = isLogged;

    // bi.isLoggedIn = false;
    bi.isLoggedIn = bi.isLogged();
    // function def for creating view
    bi.startCreating = startCreating;
    bi.cancelCreating = cancelCreating;

    // function def for getting boxinfo
    bi.getBoxinfo = getBoxinfo;

    // function def for CRUD
    bi.createBoxInfo = createBoxInfo;
    bi.createTicket = createTicket;
    bi.resetCreateForm = resetCreateForm;
    bi.deleteboxinfo = deleteboxinfo;
    // Start initialization
    //BoxInfoFactory.getBoxinfo().then(function success(response){
    //  bi.boxinfo = response.data;
    //  //  console.log(bi.boxinfo);
    //  $scope.boxinfo;
    //  $scope.boxinfo = response.data;
    //  // console.log($scope.boxinfo);
    //  bi.isLoggedIn = BoxInfoFactory.isLoggedIn();
    //})
    // $scope.boxinfo = BoxInfoFactory.getBoxinfo().then(function success(response){});
    $scope.user = AuthUserFactory.getUser();
    // $scope.user = UserFactory.getUser();
    // console.log($scope.user);
    console.log(bi.boxinfo);

    // END initialization



    // console.log(bi.isLoggedIn);

    function logout(){
      UserFactory.logout();
      // bi.user = null;
      bi.isLoggedIn = BoxInfoFactory.isLoggedIn();
      $location.path('/login');
    }

    function isLogged(){
      bi.isLoggedIn = BoxInfoFactory.isLoggedIn();
      return bi.isLoggedIn;
    }

    function getBoxinfo() {
      BoxInfoFactory.getBoxinfo().then(function success(response) {
        bi.boxinfo = response.data;
        //console.log(response.data);
      }, handleError);
    }

    function getTicket() {
      var tkuser = {
      username: AuthUserFactory.getUser()
    }
      //console.log(tkuser);
      TicketFactory.getTicket(tkuser).then(function success(response) {
        bi.tickets = response.data;
        //console.log(response.data);
      }, handleError);
    }


    function handleError(response){
      alert('Error : ' + response.data)
      // console.log(response);
    }

    function startCreating() {
      bi.isCreating = true;
    }
    function cancelCreating() {
      bi.isCreating = false;
    }

    function createBoxInfo(boxinfo) {
      BoxInfoFactory.addboxinfo(boxinfo).then(function success(res){
        $scope.result = res;
        bi.boxinfo.push(boxinfo);
        //console.log(bi.boxinfo);
        }, handleError);


    //   $http.post('/boxinfo', boxinfo).success(function(result){
    //
    // });
      // $scope.newBoxinfo = '';
      resetCreateForm();
    }
    function createTicket(newticket) {
      TicketFactory.addTicket(newticket).then(function success(res){
        $scope.result = res.data;
        newticket._id = $scope.result._id;
        newticket.date = $scope.result.date;
        //bi.tickets.push(newticket);
        bi.tickets.unshift(newticket);
        console.log($scope.result);
      }, handleError);


      //   $http.post('/boxinfo', boxinfo).success(function(result){
      //
      // });
      // $scope.newBoxinfo = '';
      resetCreateForm();
    }


    function resetCreateForm() {
      $scope.newticket = {
        title: '',
        board_contents: '',
        type: '',
        username: ''
      }
      // $scope.tempboxinfo = {
      //   license: '',
      //   boxtype: '',
      //   boxname: '',
      //   boxip: '',
      //   boxgateway: ''
      // }
    }

    function deleteboxinfo(boxinfo){
      // console.log(boxinfo);
      BoxInfoFactory.deleteboxinfo(boxinfo).then(function success(res) {
        $scope.delete = res.data;
         _.remove(bi.boxinfo, function(b) {
             return b.boxname == boxinfo.boxname;
           });
        // console.log(bi.boxinfo);
        // console.log($scope.delete);
      }, handleError);
    }
  })
    .filter('Open', function() {
      return function (type) {
        if (ticket.type == type ) return ticket.type;

      }
    })
    .factory('TicketFactory', function TicketFactory($http, API_URL_TICKET, AuthTokenFactory) {
      'use strict';

      return {
        getTicket: getTicket,
        addTicket: addTicket
      }

      function getTicket(tkuser) {
        return $http.get(API_URL_TICKET + '/ticket/' + tkuser.username, tkuser);
      }

      function addTicket(newticket){
        return $http.post(API_URL_TICKET + '/ticket', newticket)
      }
    })

  .factory('BoxInfoFactory', function BoxInfoFactory($http, API_URL_BOXINFO, AuthTokenFactory){
    'use strict';
    return {
      getBoxinfo: getBoxinfo,
      isLoggedIn: isLoggedIn,
      addboxinfo: addboxinfo,
      deleteboxinfo: deleteboxinfo
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

    function addboxinfo(boxinfo){
      return $http.post(API_URL_BOXINFO + '/boxinfo', boxinfo)
    }

    function deleteboxinfo(boxinfo) {
      console.log(boxinfo.boxname);
      return $http.delete(API_URL_BOXINFO + '/' + boxinfo.boxname, boxinfo)
    }
  })
