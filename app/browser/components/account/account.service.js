class AccountService {
  constructor($http) {
    this.name = 'AccountService';
    this.$http = $http;
  }
  updateAccount(data) {
    return this.$http.put('/account', data);
  }
  changePassword(data) {
    return this.$http.put('/account', data);
  }
  deleteAccount() {
    return this.$http.delete('/account');
  }
  forgotPassword(data) {
    return this.$http.post('/reset', data);
  }
}

export default AccountService;
