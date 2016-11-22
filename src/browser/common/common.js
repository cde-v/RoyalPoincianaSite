import angular from 'angular';
import Navbar from './navbar/navbar';
import Footbar from './footbar/footbar';
import Hero from './hero/hero';

let commonModule = angular.module('app.common', [
  Navbar.name,
  Footbar.name,
  Hero.name
]);

export default commonModule;
