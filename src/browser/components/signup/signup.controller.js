class SignupController {
  constructor($rootScope, $location, $window, $auth) {
    'ngInject';
    this.name = 'signup';
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.$window = $window;
    this.$auth = $auth;
  }
  signup() {
    console.log(this)
    this.$auth.signup(this.user)
      .then((response) => {
        this.$auth.setToken(response);
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

export default SignupController;
