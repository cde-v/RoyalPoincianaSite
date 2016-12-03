import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Documents from './documents/documents';
import Notices from './notices/notices';
import Login from './login/login';
import Signup from './signup/signup';

const componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Documents.name,
  Notices.name,
  Login.name,
  Signup.name
]);

export default componentModule;
