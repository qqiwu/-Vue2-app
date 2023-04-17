<template>
  <div class="search">
    <!-- 头部搜索框 -->
    <div class="searchtop">
      <van-nav-bar title="标题" left-text="返回" left-arrow>
        <template #left>
          <van-icon
            name="arrow-left"
            size="25"
            color="rgb(76, 80, 82)"
            @click="$router.go(-1)"
          />
        </template>
        <template #title>
          <div class="serchBox">
            <van-field
              left-icon="search"
              placeholder="请输入搜索的内容"
              v-model="searchview"
            />
          </div>
        </template>
        <template #right>
          <div class="searchbtn" @click="enterKey">搜索</div>
        </template>
      </van-nav-bar>
    </div>
    <!-- 小图标区域 -->
    <div class="seaiconlist">
      <div>
        <van-icon :name="require('@/assets/search/singer.png')" size="30" />
        <span>歌手</span>
      </div>
      <div>
        <van-icon
          :name="require('@/assets/search/MusicalStyle.png')"
          size="30"
        />
        <span>曲风</span>
      </div>
      <div>
        <van-icon
          :name="require('@/assets/search/SpecialZone.png')"
          size="30"
        />
        <span>专区</span>
      </div>
      <div>
        <van-icon :name="require('@/assets/search/cognizance.png')" size="30" />
        <span>识曲</span>
      </div>
    </div>
    <!-- 搜索历史 -->
    <div v-if="keyWorldList && keyWorldList.length > 0" class="searchhistory">
      <div class="seahistop">
        <span>搜索历史</span>
        <van-icon
          name="delete-o"
          size="25"
          color="rgb(167, 168, 168)"
          @click="deletehistory"
        />
      </div>
      <!-- 搜索历史列表 -->
      <ul class="seahislist">
        <li
          v-for="(item, index) in keyWorldList"
          :key="index"
          @click="searchHis(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- 搜索结果 -->
    <van-row v-if="songList.length > 0" class="footer_header">
      <van-col span="3">
        <van-icon
          name="play-circle"
          color="#ff0000"
          size="25"
          @click="playAll"
        />
      </van-col>
      <van-col span="18" class="playall">
        <h4>
          播放全部
          <span class="count">({{ songList.length }})</span>
        </h4>
      </van-col>
      <van-col span="2">
        <van-icon :name="require('@/assets/search/download.png')" size="20" />
      </van-col>
      <van-col span="2">
        <van-icon :name="require('@/assets/search/list.png')" size="20" />
      </van-col>
    </van-row>
    <div class="songlist">
      <van-row
        class="footer_header"
        v-for="(item, index) in songList"
        :key="index"
        @click="palyhandler(item)"
      >
        <van-col span="2"> {{ index + 1 }}</van-col>
        <van-col span="17">
          <div class="title">{{ item.name }}</div>
          <div class="msg">
            <van-icon
              :name="require('@/assets/search/sq.png')"
              size="20px"
            ></van-icon>
            {{ item.artists[0].name }}
          </div>
        </van-col>
        <van-col span="2">
          <van-icon
            :name="require('@/assets/search/videoPlay.png')"
            size="25"
            v-if="item.mvid"
          />
        </van-col>
        <van-col span="2">
          <van-icon name="ellipsis" size="25" />
        </van-col>
      </van-row>
    </div>

    <!-- 热搜榜 -->
    <div class="hotlist">
      <div class="hottop">
        <span>热搜榜</span>
        <van-button icon="play-circle" type="default" class="hotbtn">
          播放
        </van-button>
      </div>
      <!-- 热搜列表 -->
      <div class="hotlist" v-for="(hotsong, index) in hotlist" :key="index">
        <div class="hotlistcon">
          <span :class="index >= 3 ? '' : 'selectspan'">{{ index + 1 }}</span>
          <div :class="index >= 3 ? '' : 'selectdiv'">
            <b>{{ hotsong.searchWord }}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotList, getSearchList, getSongDetail } from "@/api";
import SongItemCom from "@/components/SongItemCom";
export default {
  name: "SearchView",
  data() {
    return {
      hotlist: [],
      searchview: "",
      keyWorldList: JSON.parse(localStorage.getItem("keyWorldList")) || [],
      songList: [],
      songListDefalt: [],
    };
  },
  computed: {},
  components: {},
  async created() {
    // 热搜
    var { data } = await getHotList();
    this.hotlist = data.data;
    this.hotlist = this.hotlist.splice(0, 10);
  },
  mounted() {
    this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList"))
      ? JSON.parse(localStorage.getItem("keyWorldList"))
      : [];
  },
  methods: {
    async enterKey() {
      if (this.searchview !== "") {
        // 使用 unshift() 方法将 searchview 值添加到 keyWorldList 数组的开头
        this.keyWorldList.unshift(this.searchview);
        // 使用展开运算符和 Set() 构造函数删除 keyWorldList 数组中的重复值
        this.keyWorldList = [...new Set(this.keyWorldList)];
        if (this.keyWorldList.length > 6) {
          this.keyWorldList.splice(this.keyWorldList.length - 1, 1);
        }
        // 使用 setItem() 方法将 keyWorldList 数组作为 JSON 字符串存储在本地存储中
        localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));
        //   搜索
        var { data } = await getSearchList(this.searchview);
        this.songList = data.result.songs;
        // 将 searchview 变量设置为空字符串
        this.searchview = "";
      }
    },
    deletehistory() {
      localStorage.removeItem("keyWorldList");
      this.keyWorldList = [];
    },
    async searchHis(item) {
      var { data } = await getSearchList(item);
      this.searchview = item;
      this.songList = data.result.songs;
    },
    async palyhandler(song) {
      console.log(song.id);
      let { data } = await getSongDetail(song.id);
      this.$router.push({ name: "play" });
      this.$store.dispatch("toggleSong", data.songs[0].id);
      this.$store.dispatch("addPlayList", data.songs[0]);
    },
    playAll() {
      console.log(this.songList);
      let res = [...this.songList];
      let resids = [];
      res.forEach(async (item) => {
        let { data } = await getSongDetail(item.id);
        resids.push(item.id);
        // 添加到播放列表
        this.$store.dispatch("addPlayList", data.songs[0]);
        // 切换歌曲
        this.$store.dispatch("toggleSong", data.songs[0].id);
      });
      console.log(resids);
    },
  },
};
</script>

<style scoped>
/* 搜索框 */
.van-cell {
  /*border: 1px solid #cfd3f6;*/
  border-radius: 20px;
  margin: 8px 0px;
  padding: 2px 16px;
  /*background-color: #f0e5f5;*/
}
/* 顶栏背景 */
.van-nav-bar {
  background-color: #f8f9fd;
}
/* 搜索图标颜色 */
:deep(.van-icon-search) {
  color: #bbbbbb;
}
.searchbtn {
  font-size: 14px;
  margin-right: 12px;
  margin-top: 10px;
}

/* 小图标区域 */
.seaiconlist {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  /*margin: 25px auto 0px;*/
  padding: 20px 0;
  background-color: #f8f9fd;
}

.seaiconlist div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.seaiconlist div span {
  display: block;
  margin-left: 6px;
  font-size: 14px;
}
/* 搜索历史 */
.seahistop {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  padding-bottom: 0px;
  box-sizing: border-box;
  margin-top: 10px;
  font-size: 18px;
}
/* 历史列表 */
.seahislist {
  width: 95%;
  margin: 10px auto;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}
h4 {
  font-size: 16px;
}
.seahislist li {
  list-style: none;
  padding: 5px 8px;
  background-color: #f8f9fd;
  border-radius: 10px;
  margin-left: 5px;
  margin-bottom: 5px;
}
/* 热搜榜 */
.hotlist {
  width: 90%;
  margin: 10px auto;
  background-color: pink;
  border-radius: 10px;
  height: 500px;
  font-size: 20px;
}
/* 热搜头部 */
.hottop {
  display: flex;
  align-content: center;
  padding-top: 20px;
}
.hottop span {
  display: block;
  font-weight: 600;
  margin-left: 30px;
  margin-right: 15px;
}
.hotbtn {
  background-color: rgb(243, 243, 243);
  border-radius: 25px;
  width: 80px;
  height: 30px;
}
.hotbtn span {
  margin: 0;
  font-weight: normal;
}
/* 热搜列表 */
.hotlist {
  width: 100%;
  height: auto;
  padding-left: 25px;
  box-sizing: border-box;
  margin-top: 20px;
  background-color: white;
}
.hotlistcon {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  color: rgb(184, 184, 186);
}
.hotlistcon span {
  margin-right: 20px;
}
.hotlistcon div {
  display: flex;
  align-content: center;
  font-weight: 400;
}
.hotlistcon div b {
  margin-right: 6px;
}
.hotlist .hotlistcon span.selectspan {
  color: red;
}
.hotlist .hotlistcon div.selectdiv {
  color: black;
}
/* 搜索结果列表 */
.count {
  font-size: 12px;
  color: #ccc;
}
.footer_header {
  text-align: left;
  padding: 10px 0px 10px 10px;
}
.playall {
  margin: -17px -20px;
}

.footer_header {
  text-align: left;
  padding: 10px 0px 10px 10px;
}

.title {
  font-size: 14px;
  color: #000;
}
.msg {
  color: #ccc;
  font-size: 12px;
  display: flex;
  align-content: center;
}
</style>
