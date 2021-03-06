// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives'])
  .run(function($ionicPlatform, $rootScope, Connection, $ionicLoading, $state, $timeout) {
    $ionicPlatform.ready(function() {
      localStorage.handshake = 'false';
      localStorage.ready = 'false';
      // $ionicLoading.show({
      //   hideOnStateChange: true
      // });
      $rootScope.uuid = ionic.Platform.device().uuid + 1 || 'chrometest';
      Connection.setStatus('busy');
      localStorage.uuid = $rootScope.uuid;
      Connection.newServerConnection().then(function() {
        if (!localStorage.username) {
          // $state.go('dashboard.profile');
        } else {
          Connection.saveUserOnFirebase().then(function() {
            // $state.go('dashboard.connection');
            Connection.setStatus('available');
          });
        }
      });
      // Make a peer connection
      // Check if user has profile
      // If not show the choose profile page
      // Update the firebase
      // go to all users page
      //
      //Start watchers
      //End Watchers
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
      .state('dashboard', {
        url: '/dashboard',
        abstract: true,
        template: "<ion-nav-view name='dashboard'></ion-nav-view>"
      })
      .state('dashboard.profile', {
        url: '/profile',
        views: {
          'dashboard': {
            templateUrl: 'templates/dash-profile.html',
            controller: 'DashCtrl'
          }
        }
      })
      .state('dashboard.connection', {
        url: '/connection',
        views: {
          'dashboard': {
            templateUrl: 'templates/dash-connection.html',
            controller: 'DashCtrl'
          }
        }
      })
      .state('dashboard.game', {
        url: '/game',
        views: {
          'dashboard': {
            templateUrl: 'templates/dash-game.html',
            controller: 'DashCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/dashboard/profile');
  });