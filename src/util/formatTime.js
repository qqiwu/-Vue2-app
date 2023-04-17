const formatTime = (time) => {
  // 将秒钟转为对应的00:00格式
  if (typeof time !== "number" || time <= 0) {
    return "00:00";
  }
  const m = parseInt(time / 60);
  const s = parseInt(time % 60);
  return `${toStr(m)}:${toStr(s)}`;
};
function toStr(n) {
  if (n < 10) {
    return `0${n}`;
  }
  return n;
}
export default formatTime;
