import angular from 'angular';
import uiRouter from 'angular-ui-router';
import documentsComponent from './documents.component';

let documentsModule = angular.module('documents', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('documents', {
        url: '/documents',
        template: '<documents></documents>',
        resolve: { loginRequired: loginRequired }
      });

    function loginRequired($state, $auth) {
      if (!$auth.isAuthenticated()) {
        $state.go('/login');
      }
    }

  })
  .component('documents', documentsComponent);

export default documentsModule;
