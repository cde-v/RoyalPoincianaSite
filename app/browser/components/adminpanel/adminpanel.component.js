import template from './adminpanel.html';
// import controller from './adminpanel.controller';
import './adminpanel.scss';

let AdminPanelComponent = {
  bindings: {
    userList: '<'
  },
  template: template,
  controller: class AdminPanelComponent {
    constructor($state, $rootScope, AdminPanelService) {
      'ngInject';
      this.name = 'adminpanel';
      this.$state = $state;
      this.$rootScope = $rootScope;
      this.AdminPanelService = AdminPanelService;
    }
    updateUser(user) {
      this.AdminPanelService.updateUser(user)
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
      this.AdminPanelService.toggleAdmin(user)
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
      this.AdminPanelService.deleteUser(user)
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

export default AdminPanelComponent;
