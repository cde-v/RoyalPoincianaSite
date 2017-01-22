import angular from 'angular';
import uiRouter from 'angular-ui-router';
import DocumentsComponent from './documents.component';
import DocumentsService from './documents.service';

let DocumentsModule = angular.module('documents', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('documents', {
        url: '/documents',
        component: 'documents',
        resolve: {
          documentsService: 'DocumentsService',
          documentList: function(DocumentsService) {
            return DocumentsService.getDocList();
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
  .component('documents', DocumentsComponent)
  .service('DocumentsService', DocumentsService)
  .name;

export default DocumentsModule;
