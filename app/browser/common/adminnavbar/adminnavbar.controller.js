class AdminNavbarController {
  constructor($location, $window, $auth, $rootScope) {
    this.name = 'adminnavbar';
    this.$location = $location;
    this.$window = $window;
    this.$auth = $auth;
    this.$rootScope = $rootScope;
    this.options = [
      { label: 'Add User', state: 'signup', authOnly: true, adminOnly: true },
      { label: 'Manage Users', state: 'adminusers', authOnly: true, adminOnly: true },
      { label: 'Manage Files', state: 'admindocs', authOnly: true, adminOnly: true },
      { label: 'Manage Notices', state: 'adminnotices', authOnly: true, adminOnly: true }
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

export default AdminNavbarController;
