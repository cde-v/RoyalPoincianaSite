class AdminPanelController {
  constructor(AdminPanelService) {
    'ngInject';
    this.name = 'adminpanel';
    this.AdminPanelService = AdminPanelService
  }
  getUsers() {
    console.log('ADMIN CONTROLLER GET USERS !#!@#!@#!@#')
    this.AdminPanelService.getUsers()
      .then((response) => {
        console.log('RES', response.data);
        this.users = response.data.users;
      })
      .catch((response) => {
        console.error('ERROR RES', response.data);
      });
  }
}

export default AdminPanelController;
