// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$rootScope,$http,$location,locals) {
  var user = {};
  user.uname = locals.get('loginname','');
  user.pwd = locals.get('loginpwd','');
  if(user.uname && user.pwd) {
    $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=driver_user&event=login',{
        user:user,
      })
      .success(function(data){
        if(data.status == 0) {
          sessionStorage.user = JSON.stringify(data.result);
          $rootScope.token = data.token;
          $location.path('/main/content')
        }else
        {
          $location.path('/login')
        }
      })
  }
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
      .state('login',{
        url:'/login',
        templateUrl:'templates/login.html',
        controller:'login'
      })
    .state('main',{
      url:'/main',
      templateUrl:'templates/main.html',
      controller:'main'
    })
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
      .state('register',{
          url:'/register',
          templateUrl:'templates/register.html',
          controller:'register',
      })
      .state('forgetpwd',{
        url:'/forgetpwd',
        templateUrl:'templates/forgetpwd.html',
        controller:'forgetpwd'
      })
  // Each tab has its own nav history stack:
    .state('main.content',{
      url:'/content',
      views:{
        'main': {
          templateUrl:'templates/main-content.html',
          controller:'maincontent'
        }
      }
    })
    .state('main.shouru',{
      url:'/shouru',
      views:{
        'main':{
          templateUrl:'templates/main-shouru.html',
          controller:'mainshouru'
        }
      }
    })
    .state('main.center',{
      url:'/center',
      views:{
        'main':{
          templateUrl:'templates/center.html',
          controller:'center'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
