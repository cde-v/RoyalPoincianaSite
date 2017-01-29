import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Documents from './documents/documents';
import Notices from './notices/notices';
import Login from './login/login';
import Signup from './signup/signup';
import AdminPanel from './adminpanel/adminpanel';
import AdminDocs from './admindocs/admindocs';
import AdminNotices from './adminnotices/adminnotices';
import Account from './account/account';

const componentModule = angular.module('app.components', [
  Home,
  About.name,
  Documents,
  Notices,
  Login.name,
  Signup.name,
  AdminPanel,
  AdminDocs,
  AdminNotices,
  Account.name
]);

export default componentModule;
