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
        .then((response) => {
          let messages = Array.isArray(response.data) ? response.data : [response.data];
          for (let i = 0; i < messages.length; i++) {
            Materialize.toast(messages[i].msg, 4000, 'green darken-1')
          }
          this.$state.reload()
        })
        .catch((response) => {
          let messages = Array.isArray(response.data) ? response.data : [response.data];
          for (let i = 0; i < messages.length; i++) {
            Materialize.toast(messages[i].msg, 4000, 'red darken-4')
          }
        });
    }
    deleteDoc(doc) {
      this.AdminDocsService.deleteDoc(doc)
        .then((response) => {
          let messages = Array.isArray(response.data) ? response.data : [response.data];
          for (let i = 0; i < messages.length; i++) {
            Materialize.toast(messages[i].msg, 4000, 'green darken-1')
          }
          this.$state.reload()
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

export default AdminDocsComponent;
