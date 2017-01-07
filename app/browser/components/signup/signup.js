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
        template: '<signup></signup>'
      });
    $authProvider.signupUrl = '/signup';
  })
  .component('signup', signupComponent);

export default signupModule;
