angular.module("app", ["ngRoute"])

      //  .config(function($routeProvider){
      //    $routeProvider.when('/',{
      //      templateUrl:"templates/app.html",
      //      controller:"AppCtrl"
      //    })
      //  })

       .controller("MainCtrl", function($scope){
         $scope.categories = [
           {"id":0, "name":"Developement"},
           {"id":1, "name":"Design"},
           {"id":2, "name":"Exercise"},
           {"id":3, "name":"Humor"}
         ];

         $scope.bookmarks=[
           {"id":0, "title":"Angularjs1", "url":"http://angularjs.org", "category":"Developement"},
           {"id":1, "title":"Angularjs2", "url":"http://angularjs.org", "category":"Developement"},
           {"id":2, "title":"Angularjs3", "url":"http://angularjs.org", "category":"Developement"},
           {"id":3, "title":"Angularjs4", "url":"http://angularjs.org", "category":"Developement"},
           {"id":4, "title":"Angularjs5", "url":"http://angularjs.org", "category":"Exercise"},
           {"id":5, "title":"Angularjs6", "url":"http://angularjs.org", "category":"Exercise"},
           {"id":6, "title":"Angularjs7", "url":"http://angularjs.org", "category":"Design"},
           {"id":7, "title":"Angularjs8", "url":"http://angularjs.org", "category":"Design"},
           {"id":8, "title":"Angularjs9", "url":"http://angularjs.org", "category":"Humor"},
           {"id":9, "title":"Angularjs0", "url":"http://angularjs.org", "category":"Humor"},
         ];

         $scope.currentcategory = null;

         $scope.setCurrentCategory = setCurrentCategory;
         $scope.isCurrentCategory = isCurrentCategory;

         function setCurrentCategory(category) {
           $scope.currentcategory = category;
           cancelEditing();
           cancelCreating();
         }
         function isCurrentCategory(category) {
           $scope.istrue = $scope.currentcategory !== null && category.name === $scope.currentcategory.name;
          //  console.log($scope.istrue);
           return $scope.istrue;
          }

         // creating and editing state
         $scope.isCreating = false;
         $scope.isEditing = false;
         $scope.startCreating = startCreating;
         $scope.cancelCreating = cancelCreating;
         $scope.startEditing = startEditing;
         $scope.cancelEditing = cancelEditing;
         $scope.shouldShowCreating = shouldShowCreating;
         $scope.shouldShowEditing = shouldShowEditing;

         function startCreating() {
           $scope.isCreating = true;
           $scope.isEditing = false;
           resetCreateForm();
         }
         function cancelCreating() {
           $scope.isCreating = false;
         }
         function startEditing(){
          if($scope.isEditing == false) { $scope.isEditing = true; }
          else { $scope.isEditing = false; }
           $scope.isCreating = false;
         }

         function cancelEditing(){
           $scope.isEditing = false;
         }
         function shouldShowCreating(){
           return $scope.currentcategory && !$scope.isEditing;
         }
         function shouldShowEditing() {
           return $scope.isEditing && !$scope.isCreating;
         }

        // CRUD
        // CREATE
        $scope.createBookmark = createBookmark;
        $scope.resetCreateForm = resetCreateForm;
        // UPDATE
        $scope.editedBookmark = null;
        $scope.setEditedBookmark = setEditedBookmark;
        $scope.updateBookmark = updateBookmark;
        $scope.isEditSelectedBookmark = false;
        console.log("전역 : " + $scope.isEditSelectedBookmark);
        $scope.isSelectedBookmark = isSelectedBookmark;
        //DELETE
        $scope.deleteBookmark = deleteBookmark;

        function resetCreateForm() {
          $scope.newBookmark = {
            title: '',
            url: '',
            category: ''
          }
        }
        function createBookmark(bookmark) {
          bookmark.id = $scope.bookmarks.length;
          bookmark.category = $scope.currentcategory.name;
          $scope.bookmarks.push(bookmark);
          console.log(bookmark);
          resetCreateForm();
        }

        function setEditedBookmark(bookmark) {
          $scope.editedBookmark = angular.copy(bookmark);
        }

        function updateBookmark(bookmark) {
          // lodash 라이브러리를 사용해서 현재 매개변수로 들어온 북마크 객체의 아이디 값이
          //배열 디비에 저장된 몇번째 인덱스인지 리턴해주는 함수 이용
          var index = _.findIndex($scope.bookmarks, function(b){
            return b.id == bookmark.id;
          });
          // 수정된 북막크 값을 북마크 배열의 인덱스에 저장
          $scope.bookmarks[index] = bookmark;
          $scope.editedBookmark = null;
          $scope.isEditing = false;
        }
        function isSelectedBookmark(bookmark){
        //   if($scope.isEditSelectedBookmark == true) {
        //     console.log("1. bookmark.id:" + bookmark.id + " " + $scope.editedBookmark.title + " | isEditSelectedBookmark : " + $scope.isEditSelectedBookmark);
        //     $scope.isEditSelectedBookmark = false;
        //     console.log("2. bookmark.id:" + bookmark.id + " " + $scope.editedBookmark.title + " | isEditSelectedBookmark : " + $scope.isEditSelectedBookmark);
        //     return $scope.isEditSelectedBookmark;
        //  }
        //   else {
            return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmark.id;
          //   console.log("3. bookmark.id:" + bookmark.id + " "  + bookmark.title + " | isEditSelectedBookmark : " + $scope.isEditSelectedBookmark);
          //   console.log($scope.editedBookmark.id + ":" + $scope.editedBookmark.title + " = " + bookmark.id + ":" + bookmark.title);
          //   return $scope.isEditSelectedBookmark;
          // }
          //  if($scope.editedBookmark !== null && $scope.editedBookmark.id === bookmark.id)
        }

        function deleteBookmark(bookmark) {
          // _.remove($scope.bookmarks, function(b) {
          //     return b.id == bookmark.id;
          //   });
          var index = _.findIndex($scope.bookmarks, function(b){
            return b.id == bookmark.id;
          });
          $scope.bookmarks.splice(index, 1);
        }
})
