import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AdminPanelComponent from './adminpanel.component';
import AdminPanelService from './adminpanel.service';

let AdminPanelModule = angular.module('adminpanel', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('adminpanel', {
        url: '/adminpanel',
        component: 'adminpanel',
        resolve: {
          adminPanelService: 'AdminPanelService',
          userList: function(AdminPanelService) {
            return AdminPanelService.getUsers();
          },
          loginRequired: loginRequired
        }
      });

    function loginRequired($state, $auth) {
      if (!$auth.isAuthenticated()) {
        $state.go('/login');
      }
    }
  })
  .component('adminpanel', AdminPanelComponent)
  .service('AdminPanelService', AdminPanelService)
  .name;

export default AdminPanelModule;
