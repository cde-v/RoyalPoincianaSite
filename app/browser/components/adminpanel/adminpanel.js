import angular from 'angular';
import uiRouter from 'angular-ui-router';
import adminpanelComponent from './adminpanel.component';
import AdminPanelService from './adminpanel.service';

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
  .component('adminpanel', adminpanelComponent)
  .service('AdminPanelService', AdminPanelService);

export default adminpanelModule;
