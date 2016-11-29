import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Login from './login/login';
import Signup from './signup/signup';

const componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Login.name,
  Signup.name
]);

export default componentModule;
