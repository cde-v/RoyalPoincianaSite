import angular from 'angular';
import Navbar from './navbar/navbar';
import AdminNavbar from './adminnavbar/adminnavbar';
import Footbar from './footbar/footbar';

let commonModule = angular.module('app.common', [
  Navbar.name,
  AdminNavbar.name,
  Footbar.name
]);

export default commonModule;
