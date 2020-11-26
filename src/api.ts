const api = {
  getList: '/api/blog/list',
  getmessage: 'api/message/getmessage'
  // api/message/getmessage
}
export default api;

// this.$get("/api/blog/detail", {_id: id}).then(res => {
//   console.log('res-blog', res.data.data);
//   this.value = res.data.data.content;
//   this.title = res.data.data.title;
// });