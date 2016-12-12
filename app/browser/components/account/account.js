import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountComponent from './account.component';
import AccountService from './account.service';

let accountModule = angular.module('account', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('account', {
        url: '/account',
        template: '<account></account>',
        resolve: { loginRequired: loginRequired }
      });

    function loginRequired($state, $auth) {
      if (!$auth.isAuthenticated()) {
        $state.go('/login');
      }
    }

  })
  .component('account', accountComponent)
  .service('AccountService', AccountService);

export default accountModule;
