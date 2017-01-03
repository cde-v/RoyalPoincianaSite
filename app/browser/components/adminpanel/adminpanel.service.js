class AdminPanelService {
  constructor($http) {
    'ngInject';
    this.name = 'AdminPanelService';
    this.$http = $http;
  }
  getUsers() {
    return this.$http.get('/admin/users')
      .then((response) => response.data.users)
      .catch((response) => console.error('Admin GET all users error: ', response.data));
  }
  updateUser(user) {
    return this.$http.put('/admin/user/updateUser/' + user._id, user)
  }
  toggleAdmin(user) {
    return this.$http.put('/admin/user/toggleAdmin/' + user._id)
  }
  deleteUser(user) {
    return this.$http.delete('/admin/user/delete/' + user._id);
  }
}

export default AdminPanelService;
