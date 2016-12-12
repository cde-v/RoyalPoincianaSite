class LoginController {
  constructor($rootScope, $location, $window, $auth) {
    'ngInject';
    this.name = 'login';
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.$window = $window;
    this.$auth = $auth;
    this.slideshow = [
      { imagePath: 'image02.jpg' },
      { imagePath: 'image03.jpg' },
      { imagePath: 'image04.jpg' },
      { imagePath: 'image05.jpg' },
      { imagePath: 'image06.jpg' },
      { imagePath: 'image07.jpg' },
      { imagePath: 'image08.jpg' }
    ];
  }
  login() {
    this.$auth.login(this.user)
      .then((response) => {
        this.$rootScope.currentUser = response.data.user;
        this.$window.localStorage.user = JSON.stringify(response.data.user);
        this.$location.path('/');
      })
      .catch((response) => {
        this.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      });
  }
  authenticate(provider) {
    this.$auth.authenticate(provider)
      .then((response) => {
        this.$rootScope.currentUser = response.data.user;
        this.$window.localStorage.user = JSON.stringify(response.data.user);
        this.$location.path('/');
      })
      .catch((response) => {
        if (response.error) {
          this.messages = {
            error: [{ msg: response.error }]
          };
        } else if (response.data) {
          this.messages = {
            error: [response.data]
          };
        }
      });
  }
}

export default LoginController;
