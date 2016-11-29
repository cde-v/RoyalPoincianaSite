import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMaterialize from 'angular-materialize';
import satellizer from 'satellizer';
import Common from './common/common';
import Components from './components/components';
import './app.scss';
import AppComponent from './app.component';

const root = angular
  .module('app', [
    Common.name,
    Components.name,
    angularMaterialize,
    satellizer,
    uiRouter
  ])
  .config(($locationProvider) => {
    'ngInject';
    $locationProvider.html5Mode(true).hashPrefix('!');
    // $authProvider.loginUrl = '/login';
    // $authProvider.signupUrl = '/signup';
    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }
    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  })
  .component('app', AppComponent)
  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });

export default root;
