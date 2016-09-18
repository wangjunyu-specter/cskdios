angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
    .controller('login', function($scope,$http,$ionicPopup,$location,locals) {
      $scope.user = {};
      $scope.storage = true;
      $scope.submit = function () {
        locals.set('loginname',$scope.user.uname);
        $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=driver_user&event=login',{
          user:$scope.user,
        })
            .success(function(data){
              if(data.status == 0) {
                if($scope.storage) locals.set('loginpwd',$scope.user.pwd);
                sessionStorage.user = JSON.stringify(data.result);
                $rootScope.token = data.token;
                $location.path('/main/content')
              }else
              {
                $scope.showAlert(data.result)
              }
            })
            .error(function(data){
              $scope.showAlert(data)
            })
      }
      $scope.showAlert = function(text) {
        var alertPopup = $ionicPopup.alert({
          title: '提示',
          template: text
        });
        alertPopup.then(function(res) {
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      };
    })
    .controller('register',function($scope,$http,$ionicPopup,$location,$ionicHistory) {
      $scope.user = {};
      $scope.back = function() {
        $ionicHistory.goBack();
      };
      $scope.submit = function() {
        $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=driver_user&event=register',{
          user:$scope.user
        })
            .success(function(data) {
              if(data.status == 0) {
                $scope.showConfirm('注册成功');
              }else {
                $scope.showAlert(data.result)
              }
            })
            .error(function(data) {
              $scope.showAlert(data)
            })
      }
// 一个确认对话框
      $scope.showConfirm = function(text) {
        var confirmPopup = $ionicPopup.confirm({
          title: '提示',
          template: text
        });
        confirmPopup.then(function(res) {
          if(res) {
            $location.path('/login')
          } else {
            $user = {};
          }
        });
      };

      // 一个提示对话框
      $scope.showAlert = function(text) {
        var alertPopup = $ionicPopup.alert({
          title: '警告',
          template: text
        });
        alertPopup.then(function(res) {
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      };
    })
    .controller('forgetpwd',function($scope,$http,$ionicHistory) {
      $scope.newpwd='';
      $scope.newpwd2 = '';
      $scope.back = function() {
        $ionicHistory.goBack();
      }
    })
.controller('main',function($scope){

    $scope.nav1 = true;
    $scope.nav2 = false;
    $scope.nav3 = false;
    $scope.fn1 = function() {
      $scope.nav1 = true;
      $scope.nav2 = false;
      $scope.nav3 = false;
    }
    $scope.fn2 = function() {
      $scope.nav2 = true;
      $scope.nav1 = false;
      $scope.nav3 = false;
    }
    $scope.fn3 = function() {
      $scope.nav3 = true;
      $scope.nav2 = false;
      $scope.nav1 = false;
    }
  })
.controller('maincontent',function($scope,$http,$rootScope,$ionicPopup){
    $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=order2&event=nowOrder',{
      token: $rootScope.token
    })
      .success(function(data){
        if(data.status == 0) {
          $scope.data = data.result;
        }else {
          $scope.showAlert(data.result)
        }
      })
  // 一个提示对话框
  $scope.showAlert = function(text) {
    var alertPopup = $ionicPopup.alert({
      title: '警告',
      template: text
    });
    alertPopup.then(function(res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });
  };
  })
.controller('mainshouru',function($scope,$http,$rootScope,$ionicPopup){
  $scope.select = {};
  $scope.select.num = '1';
    $scope.index = '1';
  $scope.type = 't';
  $scope.$watch('select.num',function(newVal,oldVal){
    if(newVal == '1') $scope.type = 't';
    if(newVal == '2') $scope.type = 'z';
    if(newVal == '3') $scope.type = 'y';
    if(newVal != oldVal) {
      myhttp();
    }
  })
   function myhttp() {
     $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=order2&event=weekOrder',{
         token: $rootScope.token,
         type:$scope.type,
         i:'1'
       })
       .success(function(data){
         if(data.status == 0) {
           $scope.data = data.result;
         }else {
           $scope.showAlert(data.result)
         }
       })
   }
  myhttp();
  $scope.showAlert = function(text) {
    var alertPopup = $ionicPopup.alert({
      title: '警告',
      template: text
    });
    alertPopup.then(function(res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });
  };
  })
  .controller('center',function($scope){

  })
