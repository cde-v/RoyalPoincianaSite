import template from './notices.html';
import './notices.scss';

let NoticesComponent = {
	bindings: {
    noticeList: '<'
  },
  template: template,
  controller: class NoticesComponent {
    constructor($state, NoticesService) {
      'ngInject';
      this.name = 'notices';
      this.$state = $state;
      this.NoticesService = NoticesService;
    }
  }
};

export default NoticesComponent;
