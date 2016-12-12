import angular from 'angular';
import uiRouter from 'angular-ui-router';
import adminpanelComponent from './adminpanel.component';

let adminpanelModule = angular.module('adminpanel', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('adminpanel', {
        url: '/adminpanel',
        template: '<adminpanel></adminpanel>',
        resolve: { loginRequired: loginRequired }
      });

    function loginRequired($state, $auth) {
      if (!$auth.isAuthenticated()) {
        $state.go('/login');
      }
    }

  })
  .component('adminpanel', adminpanelComponent);

export default adminpanelModule;
