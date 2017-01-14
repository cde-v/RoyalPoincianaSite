import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AdminDocsComponent from './admindocs.component';
// import AdminDocsUpload from './admindocs.directive';
import AdminDocsService from './admindocs.service';

let AdminDocsModule = angular.module('admindocs', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('admindocs', {
        url: '/admindocs',
        component: 'admindocs',
        resolve: {
          adminDocsService: 'AdminDocsService',
          documentList: function(AdminDocsService) {
            return AdminDocsService.getDocs();
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
  .component('admindocs', AdminDocsComponent)
  // .directive('fileModel', () => new AdminDocsUpload())
  .directive('fileModel', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function() {
          scope.$apply(function() {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }])
  .service('AdminDocsService', AdminDocsService)
  .name;

export default AdminDocsModule;
