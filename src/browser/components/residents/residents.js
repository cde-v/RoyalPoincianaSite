import angular from 'angular';
import uiRouter from 'angular-ui-router';
import residentsComponent from './residents.component';

let residentsModule = angular.module('residents', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('residents', {
        url: '/residents',
        template: '<residents></residents>'
      });
  })
  .directive('residents', residentsComponent);

export default residentsModule;
