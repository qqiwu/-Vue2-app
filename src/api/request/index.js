// axios的二次封装
import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3000", // 根路径
  timeout: 3000, // 超时时间
});
// 请求拦截
request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);
// 响应拦截
request.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
// cookie拦截
// request.interceptors.request.use(
//   (config) => {
//     const cookie = localStorage.getItem("cookie");

//     if (cookie) {
//       config.headers.Cookie = cookie;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// 导出request
export default request;
