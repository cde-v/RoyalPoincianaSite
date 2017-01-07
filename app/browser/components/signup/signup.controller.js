class SignupController {
  constructor($auth, $state) {
    'ngInject';
    this.name = 'signup';
    this.$auth = $auth;
    this.$state = $state;
  }
  signup() {
    this.$auth.signup(this.user)
      .then((response) => {
        this.$state.reload();
        return response;
      })
      .catch((response) => {
        this.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      });
  }
}

export default SignupController;
