import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMaterialize from 'angular-materialize';
import satellizer from 'satellizer';
import Common from './common/common';
import Components from './components/components';
import './app.scss';
// import AppComponent from './app.component';

const root = angular
  .module('app', [
    Common.name,
    Components.name,
    angularMaterialize,
    satellizer,
    uiRouter
  ])
  .config(($locationProvider) => {
    // 'ngInject';
    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  // .component('app', AppComponent);

export default root;
