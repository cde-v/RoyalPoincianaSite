import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NoticesComponent from './notices.component';
import NoticesService from './notices.service';

let NoticesModule = angular.module('notices', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('notices', {
        url: '/notices',
        component: 'notices',
        resolve: { 
          noticesService: 'NoticesService',
          noticeList: function(NoticesService) {
            return NoticesService.getNoticeList();
          },
          loginRequired: loginRequired }
      });

    function loginRequired($state, $auth) {
      if (!$auth.isAuthenticated()) {
        $state.go('/login');
      }
    }

  })
  .component('notices', NoticesComponent)
  .service('NoticesService', NoticesService)
  .name;

export default NoticesModule;
