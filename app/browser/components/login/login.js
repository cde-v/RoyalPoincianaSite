import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loginComponent from './login.component';

let loginModule = angular.module('login', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('login', {
        url: '/login',
        template: '<login></login>',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      });

    function skipIfAuthenticated($state, $auth) {
      if ($auth.isAuthenticated()) {
        $state.go('/');
      }
    }

  })
  .component('login', loginComponent);

export default loginModule;
