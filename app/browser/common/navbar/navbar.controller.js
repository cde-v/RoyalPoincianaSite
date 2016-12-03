class NavbarController {
  constructor($location, $window, $auth) {
    this.name = 'navbar';
    this.options = [
      { label: 'Home', state: 'home', authOnly: 'both' },
      { label: 'About', state: 'about', authOnly: 'both' },
      { label: 'Community Notices', state: 'notices', authOnly: true },
      { label: 'Download Documents', state: 'documents', authOnly: true },
      { label: 'Log In', state: 'login', authOnly: false },
      { label: 'Sign Up', state: 'signup', authOnly: false }
    ];
    this.$location = $location;
    this.$window = $window;
    this.$auth = $auth;
  }

  isActive(viewLocation) {
    return viewLocation === this.$location.path();
  }

  isAuthenticated() {
    return this.$auth.isAuthenticated();
  }

  logout() {
    this.$auth.logout();
    delete this.$window.localStorage.user;
    this.$location.path('/');
  }
}

export default NavbarController;
