const formatLyric = (str) => {
  if (!str.trim()) {
    throw new Error();
  }
  const timeArr = []; // 时间
  const lyricArr = []; // 歌词数组
  // 分割每一行
  const lycs = str.split("\n");
  // 遍历对应的每一行数据
  lycs.forEach((item) => {
    if (item.trim()) {
      // 对应每一行的数据进行相关操作
      // 获取时间
      // [00:04.050]
      let timeStr = item.match(/\[\d{2}\:\d{2}\.\d{2,3}\]/)[0];
      // 去除对应的前后的[]
      timeStr = timeStr.substring(1, timeStr.length - 1);
      // 拆分分秒 组成秒
      const m = timeStr.split(":")[0];
      const s = timeStr.split(":")[1];
      // 组成秒
      timeArr.push(m * 60 + parseFloat(s));
      // 获取歌词
      const lyricStr = item.replace(/\[\d{2}\:\d{2}\.\d{2,3}\]/, "");
      lyricArr.push(lyricStr);
    }
  });
  return { timeArr, lyricArr };
};
export default formatLyric;
