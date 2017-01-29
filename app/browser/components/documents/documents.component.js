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
  }
};

export default DocumentsComponent;
