class NavbarController {
  constructor($location, $window, $auth, $rootScope) {
    this.name = 'navbar';
    this.$location = $location;
    this.$window = $window;
    this.$auth = $auth;
    this.$rootScope = $rootScope;
    this.options = [
      { label: 'Home', state: 'home', authOnly: 'both', adminOnly: 'both' },
      { label: 'About', state: 'about', authOnly: 'both', adminOnly: 'both' },
      { label: 'Community Notices', state: 'notices', authOnly: true, adminOnly: 'both' },
      { label: 'Download Documents', state: 'documents', authOnly: true, adminOnly: 'both' },
      { label: 'Log In', state: 'login', authOnly: false, adminOnly: 'both' },
      { label: 'Admin: Add User', state: 'signup', authOnly: true, adminOnly: true },
      { label: 'Admin: Users', state: 'adminpanel', authOnly: true, adminOnly: true },
      { label: 'Admin: Docs', state: 'admindocs', authOnly: true, adminOnly: true },
      { label: 'Admin: Notices', state: 'adminnotices', authOnly: true, adminOnly: true },
      { label: 'My Account', state: 'account', authOnly: true, adminOnly: 'both' }
    ];
  }

  isActive(viewLocation) {
    return viewLocation === this.$location.path();
  }

  isAuthenticated() {
    return this.$auth.isAuthenticated();
  }

  isAdmin() {
    return this.$rootScope.currentUser && this.$rootScope.currentUser.isAdmin;
  }

  logout() {
    this.$auth.logout();
    delete this.$window.localStorage.user;
    delete this.$rootScope.currentUser;
    this.$location.path('/');
  }
}

export default NavbarController;
