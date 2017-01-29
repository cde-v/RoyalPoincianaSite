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
        .then(() => this.$state.reload())
    }
    deleteNotice(notice) {
      this.AdminNoticesService.deleteNotice(notice)
        .then(() => this.$state.reload());
    }
  }
};

export default AdminNoticesComponent;
