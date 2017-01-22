class DocumentsService {
  constructor($http) {
    'ngInject';
    this.name = 'DocumentsService';
    this.$http = $http;
  }
  getDocList() {
    return this.$http.get('/documents')
      .then(function(response) {
        console.log(response.data.docs);
        return response.data.docs;
      })
      .catch(function(response) {
        console.error('getDocList error: ', response.data);
      });
  }
}

export default DocumentsService;
