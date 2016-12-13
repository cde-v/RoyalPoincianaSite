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
        console.log('UPDATE USERS', response.data)
        this.messages = {
          success: [response.data]
        };
      })
      .catch((response) => {
        this.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      });
  }

  changePassword() {
    this.AccountService.changePassword(this.account)
      .then((response) => {
        this.messages = {
          success: [response.data]
        };
      })
      .catch((response) => {
        this.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
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
        this.messages = {
          error: [response.data]
        };
      });
  }
}

export default AccountController;
