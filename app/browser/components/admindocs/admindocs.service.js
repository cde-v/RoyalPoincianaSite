class AdminDocsService {
  constructor($http) {
    'ngInject';
    this.name = 'AdminDocsService';
    this.$http = $http;
  }
  getDocs() {
    return this.$http.get('/admin/documents')
      .then((response) => {
        console.log('RES', response.data);
        return response.data;
      })
      .catch((response) => {
        console.error('Admin GET all docs error: ', response);
    });
  }
  uploadFile(file) {
    let fd = new FormData();
    fd.append('file', file);

    this.$http.post('/admin/documents/upload', fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      })
      .success(function() {})
      .error(function() {})
  }
  deleteFile(document) {
    console.log('typeof document', typeof document);
    return this.$http.delete('/admin/documents/delete/' + document);
  }
}

export default AdminDocsService;
