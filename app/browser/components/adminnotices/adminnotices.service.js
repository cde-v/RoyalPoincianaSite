class AdminNoticesService {
  constructor($http) {
    'ngInject';
    this.name = 'AdminNoticesService';
    this.$http = $http;
  }
  getNoticeList() {
    return this.$http.get('/admin/notices')
      .then(function(response) {
        return response.data.notices;
      })
      .catch(function(response) {
        console.error('getNoticeList error: ', response.data);
      });
  }
  uploadNotice(notice) {

  }
  deleteNotice(notice) {
    return this.$http.delete('/admin/notices/delete/' + notice.name)
      .then(function(response) {
        return response.data;
      })
      .catch(function(response) {
        console.error('deleteNotice error:', response.data);
      })
  }
}

export default AdminNoticesService;
