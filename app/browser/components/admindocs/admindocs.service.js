class AdminDocsService {
  constructor($http) {
    'ngInject';
    this.name = 'AdminDocsService';
    this.$http = $http;
  }
  getDocList() {
    return this.$http.get('/admin/documents')
      .then(function(response) {
        let data = response.data.docs.map(function(cV, i, arr) {
          let date = new Date(response.data.docs[0].createdAt);
          cV.displayDate = date.toDateString();
          return cV;
        })

        data.sort(function(a, b) {
          return a.category > b.category;
        });
        return data;
      })
      .catch(function(response) {
        console.error('getDocList error: ', response.data);
      });
  }
  uploadDoc(myDoc) {
    let fd = new FormData();
    fd.append('file', myDoc.file);
    fd.append('title', myDoc.title);
    fd.append('desc', myDoc.desc);
    fd.append('category', myDoc.category);

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
    return this.$http.delete('/admin/documents/delete/' + doc.filename);
    // .then(function(response) {
    //   return response.data;
    // })
    // .catch(function(response) {
    //   console.error('deleteDoc error:', response.data);
    // })
  }
}

export default AdminDocsService;
