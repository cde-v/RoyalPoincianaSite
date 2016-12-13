class AdminPanelService {
  constructor($http) {
    this.name = 'AdminPanelService';
    this.$http = $http;
  }
  getUsers() {
    console.log('ADMIN PANEL SERVICE GET USERS !@#!@#!@#!@#!@#');
    return this.$http.get('/admin');
  }
}

export default AdminPanelService;
