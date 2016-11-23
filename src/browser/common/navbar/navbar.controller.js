class NavbarController {
  constructor($location, $window, $auth) {
    this.name = 'navbar';

    this.options = [
      { label: 'Home', state: 'home' },
      { label: 'About', state: 'about' },
      { label: 'Contact', state: 'contact' },
      { label: 'Resident Portal', state: 'residents' }
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
