class DocumentsService {
  constructor($http) {
    'ngInject';
    this.name = 'DocumentsService';
    this.$http = $http;
  }
  getDocList() {
    return this.$http.get('/documents')
      .then(function(response) {
        let data = response.data.docs.map(function(cV, i, arr) {
          let date = new Date(response.data.docs[0].createdAt);
          cV.displayDate = date.toDateString();
          return cV;
        })
        data.sort(function(a, b) {
          return a.category > b.category;
        });
        data.sort(function(a, b) {
          return a.dateCreated > b.dateCreated;
        })
        return data;
      })
      .catch(function(response) {
        console.error('getDocList error: ', response.data);
      });
  }
}

export default DocumentsService;
