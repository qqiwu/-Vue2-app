module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 37.5, //37.5 -->375的设计稿
      propList: ["*"], //所有的属性都转换
      exclude: /node_modules/i, //排查制定目录的文件不转rem
      selectorBlackList: ["my-", ".my-"], //要忽略的选择器，保留为px
    },
  },
};
