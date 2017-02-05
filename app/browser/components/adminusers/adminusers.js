import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AdminUsersComponent from './adminusers.component';
import AdminUsersService from './adminusers.service';

let AdminUsersModule = angular.module('adminusers', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('adminusers', {
        url: '/adminusers',
        component: 'adminusers',
        resolve: {
          adminUsersService: 'AdminUsersService',
          userList: function(AdminUsersService) {
            return AdminUsersService.getUsers();
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
  .component('adminusers', AdminUsersComponent)
  .service('AdminUsersService', AdminUsersService)
  .name;

export default AdminUsersModule;
