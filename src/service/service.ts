import axios from "axios";

const get = (url: string, params?: any) => {
  const promise = new Promise((reslove) => {
    axios({
      method: "get",
      url: url,
      params
    }).then(res => {
      console.log('res.data-list', res.data);
      reslove(res.data.data);
    });
  });
  return promise;
};
const post = (url: string, params?: any) => {
  const promise = new Promise((reslove) => {
    axios({
      method: "post",
      url: url,
      data: params,
      responseType: 'json',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      reslove(res);
    });
  });
  return promise;
};
export { get, post };
