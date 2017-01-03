import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMaterialize from 'angular-materialize';
import satellizer from 'satellizer';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import './app.scss';

angular.module('app', [
    uiRouter,
    angularMaterialize,
    satellizer,
    Common.name,
    Components.name
  ])
  .config(($locationProvider, $authProvider) => {
    'ngInject';
    $locationProvider.html5Mode(true).hashPrefix('!');
    // $locationProvider.html5Mode(true);

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';

  })
  .component('app', AppComponent)
  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });
