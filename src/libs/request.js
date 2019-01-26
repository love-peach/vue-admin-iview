import qs from 'qs';
import axios from 'axios';
import { checkHttpStatus, checkBackendCode } from './request-tips';

console.log(process.env, 'process.env');

// 创建实例
const instance = axios.create({});

let cancel = {};
const promiseArr = {};
const { CancelToken } = axios;

// 根据运行环境 配置 baseURL
// instance.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;

// 设置请求默认属性
instance.defaults.timeout = 10000;
instance.defaults.headers['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
instance.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
instance.defaults.responseType = 'json';

// 数据序列化
instance.defaults.transformRequest = [data => qs.stringify(data)];

// 请求发送之前的拦截处理
instance.interceptors.request.use(
  config => {
    // 发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]('操作取消');
      promiseArr[config.url] = cancel;
    } else {
      promiseArr[config.url] = cancel;
    }
    // 统一设置 token
    config.headers.Token = localStorage.getItem('token') || '';
    // 合并自定义的 header
    config.headers = Object.assign({}, config.headers, config.customHeaders);
    return config;
  },
  error => Promise.reject(error)
);

// 请求完成之后的拦截处理
instance.interceptors.response.use(response => response, error => Promise.resolve(error.response));

export default {
  get(url, params, options) {
    return instance({
      method: 'get',
      url,
      params, // get 请求时带的参数 叫 'params'
      customHeaders: { ...options },
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    })
      .then(response => checkHttpStatus(response))
      .then(res => checkBackendCode(res));
  },
  post(url, data, options) {
    return instance({
      method: 'post',
      url,
      data, // post 请求时带的参数 叫 'data'
      customHeaders: { ...options },
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    })
      .then(response => checkHttpStatus(response))
      .then(res => checkBackendCode(res));
  },
};
