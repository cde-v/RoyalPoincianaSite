import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Residents from './residents/residents';

const componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Residents.name
]);

export default componentModule;
