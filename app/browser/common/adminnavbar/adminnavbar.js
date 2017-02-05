import angular from 'angular';
import uiRouter from 'angular-ui-router';
import adminNavbarComponent from './adminnavbar.component';

let adminNavbarModule = angular.module('adminnavbar', [
    uiRouter
  ])
  .component('adminnavbar', adminNavbarComponent);

export default adminNavbarModule;
