// 根据请求报错状态码 格式化错误信息
function transformErrMsg(error) {
  switch (error.status) {
    case 400:
      error.message = '错误请求';
      break;
    case 401:
      error.message = '未授权，请重新登录';
      break;
    case 403:
      error.message = '拒绝访问';
      break;
    case 404:
      error.message = '请求错误,未找到该资源';
      break;
    case 405:
      error.message = '请求方法未允许';
      break;
    case 408:
      error.message = '请求超时';
      break;
    case 500:
      error.message = '服务器端出错';
      break;
    case 501:
      error.message = '网络未实现';
      break;
    case 502:
      error.message = '网络错误';
      break;
    case 503:
      error.message = '服务不可用';
      break;
    case 504:
      error.message = '网络超时';
      break;
    case 505:
      error.message = 'http版本不支持该请求';
      break;
    default:
      error.message = `连接错误${error.response.status}`;
  }
}

function checkHttpStatus(response) {
  console.log(response, 'response');
  // 如果 http 状态码正常，则直接返回数据
  if (response.status === 200 || response.status === 304) {
    return response;
  }
  transformErrMsg(response);
  return {
    status: response.status,
    data: {
      code: response.code,
      message: response.message,
    },
  };
}

function checkBackendCode(res) {
  if (res.status !== 200) {
    console.log('发生了一个网络错误！');
    console.log(`status: ${res.status}；code：${res.data.code}；message：${res.data.message}`);
  } else if (res.data.code !== 200) {
    console.log('后端给出的异常');
    console.log(`status: ${res.status}；code：${res.data.code}；message：${res.data.message}`);
  }
  return res.data;
}

export { transformErrMsg, checkHttpStatus, checkBackendCode };
