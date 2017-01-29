class AdminNoticesService {
  constructor($http) {
    'ngInject';
    this.name = 'AdminNoticesService';
    this.$http = $http;
  }
  getNoticeList() {
    return this.$http.get('/notices')
      .then(function(response) {
        return response.data.notices;
      })
      .catch(function(response) {
        console.error('getNoticeList error: ', response.data);
      });
  }
  addNotice(notice) {
    return this.$http.post('/admin/notices/add/', notice)
      .then(function(response) {
        return response.data;
      })
      .catch(function(response) {
        console.error('addNotice error: ', response.data);
      });
  }
  deleteNotice(notice) {
    return this.$http.delete('/admin/notices/delete/' + notice._id)
      .then(function(response) {
        return response.data;
      })
      .catch(function(response) {
        console.error('deleteNotice error:', response.data);
      })
  }
}

export default AdminNoticesService;
