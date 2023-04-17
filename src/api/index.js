import request from "./request";
// 简单的接口封装
export const getBanner = (type) =>
  request({
    url: "/banner",
    method: "get",
    params: {
      type,
    },
  });
// 歌单(网友精选碟)
export const getTopPlayList = (cat, limit = 10) =>
  request({
    url: "/top/playlist",
    method: "get",
    params: {
      cat,
      limit,
    },
  });
// 推荐歌单
export const getPersonalized = (limit) =>
  request({
    url: "/personalized",
    method: "get",
    params: {
      limit,
    },
  });
// 获取歌单详情
export const getPlayListDetail = (id) =>
  request({
    url: "/playlist/detail",
    method: "get",
    params: {
      id,
    },
  });
// 获取歌曲详情
export const getSongDetail = (ids) =>
  request({
    url: "/song/detail",
    method: "get",
    params: {
      ids,
    },
  });
// 获取歌词
export const getSonglyric = (id) =>
  request({
    url: "/lyric",
    method: "get",
    params: {
      id,
    },
  });
// 获取音乐url-新版
// 定义 exhigh 的值
const exhigh = "exhigh";

// 封装获取歌曲链接的方法
export const getSongUrl = (id, level = exhigh) =>
  request({
    url: "/song/url/v1",
    method: "get",
    params: {
      id,
      level,
    },
  })
    .then((response) => {
      // 在请求成功时处理响应数据
      return response.data;
    })
    .catch((error) => {
      // 在请求失败时处理错误
      console.error(error);
      // 返回一个 Promise.reject 对象，用于抛出错误
      return Promise.reject(error);
    });
// 二维码登录接口
// 获取key
export const getQrKey = () =>
  request({
    url: "/login/qr/key",
    method: "get",
    params: {
      timestamp: Date.now(),
    },
  });
// 获取二维码
export const getQr = (key) =>
  request({
    url: "/login/qr/create",
    method: "get",
    params: {
      key,
      qrimg: true,
      timestamp: Date.now(),
    },
  });
// 验证二维码
export const checkQr = (key) =>
  request({
    url: "/login/qr/check",
    method: "get",
    params: {
      key,
      timestamp: Date.now(),
    },
  });
export const getSearchList = (keywords) =>
  request({
    url: "/search",
    method: "get",
    params: { keywords },
  });
export const getHotList = () =>
  request({
    url: "/search/hot/detail",
    method: "get",
    params: {},
  });
// 获取状态
export const getStatus = (cookie = "") =>
  request({
    url: "/login/status",
    method: "get",
    params: {
      cookie,
      timestamp: Date.now(),
    },
  });
// /user/detail  获取用户详情
export const getUserDetail = (uid) =>
  request({
    url: "/user/detail",
    method: "get",
    params: {
      uid,
    },
  });
// /user/account 获取账号信息
// export const getUserAccount = (cookie) => {
//   return request({
//     url: "/user/account",
//     method: "get",
//     headers: {
//       Cookie: cookie,
//     },
//   })
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
// };

// /recommend/songs
// 获取每日推荐
// export const getRecSongs = () => {
//   const cookie = localStorage.getItem("cookie");

//   return request({
//     url: "/recommend/songs",
//     method: "get",
//     withCredentials: true, // 将 withCredentials 设置放在 headers 头部之前
//     headers: {
//       cookie: cookie,
//     },
//   });
// };

export const getRecSongs = () => {
  const cookie = localStorage.getItem("cookie");
  // console.log(cookie);

  return request({
    url: `/recommend/songs?cookie=${cookie}`,
    method: "get",
  });
};
export const likeSongs = (ids) => {
  const cookie = localStorage.getItem("cookie");

  return request({
    url: `/likelist?${ids}&cookie=${cookie}`,
    method: "get",
  });
};

// /user/record  获取用户播放记录
export const getUserRecord = (uid) =>
  request({
    url: "/user/record",
    method: "get",
    params: {
      uid,
    },
  });
