import template from './adminnotices.html';
import './adminnotices.scss';

let AdminNoticesComponent = {
  bindings: {
    noticeList: '<'
  },
  template: template,
  controller: class AdminNoticesComponent {
    constructor($state, AdminNoticesService) {
      'ngInject';
      this.name = 'adminnotices';
      this.$state = $state;
      this.AdminNoticesService = AdminNoticesService;
    }
    addNotice(notice) {
      this.AdminNoticesService.addNotice(notice)
        .then((response) => {
          console.log(response.data)
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
    deleteNotice(notice) {
      this.AdminNoticesService.deleteNotice(notice)
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

export default AdminNoticesComponent;
