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
    uploadFile(){
        let file = this.myFile;
        console.log('file is: ', file);
        this.AdminDocsService.uploadFile(file);
    }
    // getDocs() {
    //   this.AdminDocsService.getDocs()
    //   .then((docs) => {
    //     // this.$state.reload();
    //       return docs;
    //   })
    // }
    deleteFile(document) {
      this.AdminDocsService.deleteFile(document)
        .then((deletedDocument) => {
          this.$state.reload();
          return deletedDocument;
        });
    }
  }
};

export default AdminDocsComponent;
