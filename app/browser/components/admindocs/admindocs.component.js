import template from './admindocs.html';
import './admindocs.scss';

let AdminDocsComponent = {
  bindings: {
    documentList: '<'
  },
  template: template,
  controller: class AdminDocsComponent {
    constructor($state, AdminDocsService) {
      'ngInject';
      this.name = 'admindocs';
      this.$state = $state;
      this.AdminDocsService = AdminDocsService;
    }
    uploadDoc(doc) {
      this.AdminDocsService.uploadDoc(doc)
        .then(() => this.$state.reload())
    }
    deleteDoc(doc) {
      this.AdminDocsService.deleteDoc(doc)
        .then(() => this.$state.reload());
    }
  }
};

export default AdminDocsComponent;
