class NoticesService {
  constructor($http) {
    'ngInject';
    this.name = 'NoticesService';
    this.$http = $http;
  }
  getNoticeList() {
    return this.$http.get('/notices')
      .then(function(response) {
        let notices = response.data.notices.map(function(cV, i, a) {
          cV.timestamp = new Date(cV.createdAt).toDateString();
          return cV;
        })
        console.log(notices);
        return notices;
      })
      .catch(function(response) {
        console.error('getNoticeList error: ', response.data);
      });
  }
}

export default NoticesService;
