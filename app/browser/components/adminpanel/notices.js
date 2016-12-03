import angular from 'angular';
import uiRouter from 'angular-ui-router';
import noticesComponent from './notices.component';

let noticesModule = angular.module('notices', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('notices', {
        url: '/notices',
        template: '<notices></notices>',
        resolve: { loginRequired: loginRequired }
      });

    function loginRequired($state, $auth) {
      if (!$auth.isAuthenticated()) {
        $state.go('/login');
      }
    }

  })
  .component('notices', noticesComponent);

export default noticesModule;
