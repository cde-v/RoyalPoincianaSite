import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loginComponent from './login.component';
import satellizer from 'satellizer';

let loginModule = angular.module('login', [
    uiRouter,
    satellizer
  ])
  .config(($stateProvider, $authProvider) => {
    'ngInject';
    $stateProvider
      .state('login', {
        url: '/login',
        template: '<login></login>',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      });

    $authProvider.loginUrl = '/login';

    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

  })
  .component('login', loginComponent);

export default loginModule;
