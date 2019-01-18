const util = require('../../utils/util.js');

function request(options) {
  wx.request({
    url: options.url || '',
    method: options.method || 'GET',
    header: options.header || { 'content-type': 'application/json' },
    data: options.data || {},
    success: function (res) {
      //HTTP返回状态码 
      const statusCode = res.statusCode;

      switch (statusCode) {
        case 200: {
          //执行定义好的成功后回调事件
          options.success(res);
          console.dir(util.jsonExtends(options,{data:{}}));
          requestSuccessCallback(options, res);
          break;
        } 
        case 400: {

          break;
        }
        case 401: {

          break;
        }
        case 402: {

          break;
        }
        case 403: {

          break;
        }
        case 404: {

          break;
        }
        case 500: {
          requestSuccessCallback(options, res);

          break;
        }
      }
     
    }
  })
}
function requestSuccessCallback(options, res) {
  if(options){}
}

function requestErrorCallback(options, res) {

}



module.exports = {
  request: request
}