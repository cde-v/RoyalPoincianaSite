import angular from 'angular';
import uiRouter from 'angular-ui-router';
import signupComponent from './signup.component';
import satellizer from 'satellizer';

let signupModule = angular.module('signup', [
    uiRouter,
    satellizer
  ])
  .config(($stateProvider, $authProvider) => {
    'ngInject';
    $stateProvider
      .state('signup', {
        url: '/signup',
        template: '<signup></signup>',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      });

    $authProvider.signupUrl = '/signup';

    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }
  })
  .component('signup', signupComponent);

export default signupModule;
