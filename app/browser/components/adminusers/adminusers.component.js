import template from './adminusers.html';
// import controller from './adminusers.controller';
import './adminusers.scss';

let AdminUsersComponent = {
  bindings: {
    userList: '<'
  },
  template: template,
  controller: class AdminUsersComponent {
    constructor($state, $rootScope, AdminUsersService) {
      'ngInject';
      this.name = 'adminusers';
      this.$state = $state;
      this.$rootScope = $rootScope;
      this.AdminUsersService = AdminUsersService;
    }
    updateUser(user) {
      this.AdminUsersService.updateUser(user)
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
    toggleAdmin(user) {
      this.AdminUsersService.toggleAdmin(user)
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
    deleteUser(user) {
      this.AdminUsersService.deleteUser(user)
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
};

export default AdminUsersComponent;
