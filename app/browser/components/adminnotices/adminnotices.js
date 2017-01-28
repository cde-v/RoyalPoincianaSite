import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AdminNoticesComponent from './adminnotices.component';
import AdminNoticesService from './adminnotices.service';

let AdminNoticesModule = angular.module('adminnotices', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('adminnotices', {
        url: '/adminnotices',
        component: 'adminnotices',
        resolve: {
          adminNoticesService: 'AdminNoticesService',
          noticeList: function(AdminNoticesService) {
            return AdminNoticesService.getNoticeList();
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
  .component('adminnotices', AdminNoticesComponent)
  .service('AdminNoticesService', AdminNoticesService)
  .name;

export default AdminNoticesModule;
