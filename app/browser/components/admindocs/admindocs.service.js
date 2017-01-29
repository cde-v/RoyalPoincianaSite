class AdminDocsService {
  constructor($http) {
    'ngInject';
    this.name = 'AdminDocsService';
    this.$http = $http;
  }
  getDocList() {
    return this.$http.get('/admin/documents')
      .then(function(response) {
        console.log(response.data.docs);
        return response.data.docs;
      })
      .catch(function(response) {
        console.error('getDocList error: ', response.data);
      });
  }
  uploadDoc(myDoc) {
    let fd = new FormData();
    fd.append('file', myDoc.file);
    fd.append('desc', myDoc.desc);

    return this.$http.post('/admin/documents/upload', fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      });
      // .then(function(response) {
      //   return response.data;
      // })
      // .catch(function(response) {
      //   console.error('uploadDoc error:', response.data);
      // })
  }
  deleteDoc(doc) {
    return this.$http.delete('/admin/documents/delete/' + doc.name);
      // .then(function(response) {
      //   return response.data;
      // })
      // .catch(function(response) {
      //   console.error('deleteDoc error:', response.data);
      // })
  }
}

export default AdminDocsService;
