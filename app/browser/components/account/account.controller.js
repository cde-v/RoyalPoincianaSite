class AccountController {
  constructor($rootScope, $location, $window, $auth, AccountService) {
    'ngInject';
    this.name = 'account';
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.$window = $window;
    this.$auth = $auth;
    this.AccountService = AccountService;
    this.account = $rootScope.currentUser;
  }
  updateAccount() {
    this.AccountService.updateAccount(this.account)
      .then((response) => {
        this.$rootScope.currentUser = response.data.user;
        this.$window.localStorage.user = JSON.stringify(response.data.user);
        let messages = Array.isArray(response.data) ? response.data : [response.data];
        for (let i = 0; i < messages.length; i++) {
          Materialize.toast(messages[i].msg, 4000, 'green darken-1')
        }
      })
      .catch((response) => {
        let messages = Array.isArray(response.data) ? response.data : [response.data];
        for (let i = 0; i < messages.length; i++) {
          Materialize.toast(messages[i].msg, 4000, 'red darken-4')
        }
      });
  }

  changePassword() {
    this.AccountService.changePassword(this.account)
      .then((response) => {
        let messages = Array.isArray(response.data) ? response.data : [response.data];
        for (let i = 0; i < messages.length; i++) {
          Materialize.toast(messages[i].msg, 4000, 'green darken-1')
        }
      })
      .catch((response) => {
        let messages = Array.isArray(response.data) ? response.data : [response.data];
        for (let i = 0; i < messages.length; i++) {
          Materialize.toast(messages[i].msg, 4000, 'red darken-4')
        }
      });
  }

  deleteAccount() {
    this.AccountService.deleteAccount()
      .then(function() {
        this.$auth.logout();
        delete this.$window.localStorage.user;
        this.$location.path('/');
      })
      .catch(function(response) {
        let messages = Array.isArray(response.data) ? response.data : [response.data];
        for (let i = 0; i < messages.length; i++) {
          Materialize.toast(messages[i].msg, 4000, 'red darken-4')
        }
      });
  }
}

export default AccountController;
