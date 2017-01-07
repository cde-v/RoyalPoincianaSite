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
    return this.$http.put('/admin/users/updateUser/' + user._id, user)
  }
  toggleAdmin(user) {
    return this.$http.put('/admin/users/toggleAdmin/' + user._id)
  }
  deleteUser(user) {
    return this.$http.delete('/admin/users/delete/' + user._id);
  }
}

export default AdminPanelService;
