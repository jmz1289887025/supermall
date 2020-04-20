import axios from 'axios'
export function request(config) {
  //1.创建axios的实列
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/h8',
    timeout: 5000
  })
  //2.axios拦截器
  instance.interceptors.request.use(config => {
    //1.比如config中数据不符合服务器要求
    //2.每次发送网络请求时,显示网络请求图标
    //3.某些网络请求必须携带特殊信息 
    return config
  }, err => {
    return err
  });
  instance.interceptors.response.use(
    res => {
      return res.data
    },
    err => {
      return err
    }
  );
  //3.发送真正的网络请求
  return instance(config)
 }