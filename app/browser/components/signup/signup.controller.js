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
        let messages = Array.isArray(response.data) ? response.data : [response.data];
        for (let i = 0; i < messages.length; i++) {
          Materialize.toast(messages[i].msg, 4000, 'green darken-1')
        }
        this.$state.reload();
      })
      .catch((response) => {
        let messages = Array.isArray(response.data) ? response.data : [response.data];
        for (let i = 0; i < messages.length; i++) {
          Materialize.toast(messages[i].msg, 4000, 'red darken-4')
        }
      });
  }
}

export default SignupController;
