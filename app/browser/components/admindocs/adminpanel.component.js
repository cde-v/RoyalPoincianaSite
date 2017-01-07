import template from './adminpanel.html';
import './adminpanel.scss';

let AdminPanelComponent = {
  bindings: {
    userList: '<'
  },
  template: template,
  controller: class AdminPanelComponent {
    constructor($state, AdminPanelService) {
      'ngInject';
      this.name = 'adminpanel';
      this.$state = $state;
      this.AdminPanelService = AdminPanelService;
    }
    updateUser(user) {
      this.AdminPanelService.updateUser(user)
        .then((updatedUser) => {
          this.$state.reload();
          return updatedUser;
        })
    }
    toggleAdmin(user) {
      this.AdminPanelService.toggleAdmin(user)
        .then((toggledUser) => {
          this.$state.reload();
          return toggledUser;
        })
    }
    deleteUser(user) {
      this.AdminPanelService.deleteUser(user)
        .then((deletedUser) => {
          this.$state.reload();
          return deletedUser;
        });
    }
  }
};

export default AdminPanelComponent;