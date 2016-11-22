import angular from 'angular';
import uiRouter from 'angular-ui-router';
import todosComponent from './todos.component';
import todosFactory from './todos.factory';

let todosModule = angular.module('todos', [
    uiRouter
  ])
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('todos', {
        url: '/',
        template: '<todos></todos>'
      });
  })
  .directive('todos', todosComponent)
  .factory('todosFactory', todosFactory);

export default todosModule;
