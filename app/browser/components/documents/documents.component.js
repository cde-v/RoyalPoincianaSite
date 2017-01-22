import template from './documents.html';
import './documents.scss';

let DocumentsComponent = {
  bindings: {
    documentList: '<'
  },
  template: template,
  controller: class DocumentsComponent {
    constructor($state, DocumentsService) {
      'ngInject';
      this.name = 'documents';
      this.$state = $state;
      this.DocumentsService = DocumentsService;
    }
    uploadDoc(doc) {
      this.DocumentsService.uploadDoc(doc)
        .then(() => this.$state.reload())
    }
    deleteDoc(doc) {
      this.DocumentsService.deleteDoc(doc)
        .then(() => this.$state.reload());
    }
  }
};

export default DocumentsComponent;
