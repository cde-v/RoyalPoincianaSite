import angular from 'angular';
import Navbar from './navbar/navbar';
import Footbar from './footbar/footbar';

let commonModule = angular.module('app.common', [
  Navbar.name,
  Footbar.name
]);

export default commonModule;
