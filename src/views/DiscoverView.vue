<template>
  <div class="discover-view">
    <!-- 头部 -->
    <van-nav-bar>
      <template #left>
        <div @click="showPopup">
          <van-icon name="wap-nav" size="20" />
        </div>
      </template>
      <template #title>
        <van-field
          left-icon="search"
          right-icon="scan"
          placeholder="请输入数据"
          @focus="Search"
        />
      </template>
      <template #right>
        <van-icon :name="require('@/assets/discover/tgsq.png')" size="20" />
      </template>
    </van-nav-bar>
    <!-- 内容部分 -->
    <!-- banner的内容 -->
    <div class="bannerBox">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="banner in banners" :key="banner.imageUrl">
          <van-image :src="banner.imageUrl" radius="20">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 相关导航 -->
    <nav class="nav-icon">
      <van-swipe @change="onChange">
        <van-swipe-item>
          <van-grid :column-num="5" :border="false">
            <van-grid-item
              v-for="(item, index) in 5"
              :key="index"
              :icon="icons[index].icon"
              :text="icons[index].title"
              @click="$router.push(icons[index].route)"
            />
          </van-grid>
        </van-swipe-item>
        <van-swipe-item>
          <van-grid :column-num="5" :border="false">
            <van-grid-item
              v-for="(item, index) in 5"
              :key="index"
              :icon="icons[index + 5].icon"
              :text="icons[index + 5].title"
              @click="$router.push(icons[index].route)"
            />
          </van-grid>
        </van-swipe-item>
        <template #indicator>
          <div
            class="custom-indicator left"
            :class="{ activedCurrent: current == 0 }"
          ></div>
          <div
            class="custom-indicator right"
            :class="{ activedCurrent: current == 1 }"
          ></div>
        </template>
      </van-swipe>
    </nav>
    <!-- 对应的歌单列表 -->
    <div class="songListBox">
      <song-list-nav :list="playLists" title="推荐歌单"></song-list-nav>
    </div>
    <!-- 歌曲的相关热点 -->
    <hot-songs
      :title="toggleArr[0].title"
      :songs="songs.tracks"
      @click="toggleSongs"
    ></hot-songs>
    <!-- 华语 -->
    <div class="songListBox">
      <song-list-nav :list="playLists1" title="华语歌单"></song-list-nav>
    </div>
  </div>
</template>
<script>
import {
  getBanner,
  getPersonalized,
  getPlayListDetail,
  getTopPlayList,
} from "@/api/";
import SongListNav from "@/components/SongListNav";
import HotSongs from "@/components/HotSongs";

export default {
  name: "discover-view",
  data() {
    return {
      banners: [],
      current: 0,
      icons: [
        {
          icon: require("@/assets/discover/a1.png"),
          title: "每日推荐",
          route: "recommend",
        },
        {
          icon: require("@/assets/discover/a2.png"),
          title: "私人FM",
          route: "privateFM",
        },
        {
          icon: require("@/assets/discover/a3.png"),
          title: "歌单",
          route: "songSheet",
        },
        {
          icon: require("@/assets/discover/a4.png"),
          title: "排行榜",
          route: "rankingList",
        },
        {
          icon: require("@/assets/discover/a5.png"),
          title: "有声书",
          route: "audiobook",
        },
        {
          icon: require("@/assets/discover/a6.png"),
          title: "数字专辑",
          route: "digitalAlbum",
        },
        {
          icon: require("@/assets/discover/a7.png"),
          title: "关注新歌",
          route: "followNewSongs",
        },
        {
          icon: require("@/assets/discover/a8.png"),
          title: "一歌一遇",
        },
        {
          icon: require("@/assets/discover/a9.png"),
          title: "收藏家",
          route: "collector",
        },
        {
          icon: require("@/assets/discover/a10.png"),
          title: "游戏专区",
          route: "gameZone",
        },
      ],
      playLists: [],
      songs: [],
      playLists1: [],
      toggleArr: [
        {
          title: "云深不知处",
          id: 7760105958,
        },
        {
          title: "喜欢不是喜欢",
          id: 5234379562,
        },
        {
          title: "诗与远方",
          id: 3049959017,
        },
        {
          title: "你还没网易云懂我",
          id: 908115420,
        },
        {
          title: "周董与我",
          id: 7813353722,
        },
      ],
    };
  },
  computed: {},
  components: {
    SongListNav,
    HotSongs,
  },
  async created() {
    var { data } = await getBanner();
    this.banners = data.banners;
    var { data } = await getPersonalized(10);
    this.playLists = data.result;
    // 第一次
    this.getSongs();
    var { data } = await getTopPlayList("华语");
    this.playLists1 = data.playlists;
  },
  mounted() {},
  methods: {
    // 轮播的切换
    onChange(index) {
      this.current = index;
    },
    // 数据重新加载
    async toggleSongs() {
      this.toggleArr.push(this.toggleArr.shift());
      this.getSongs();
    },
    async getSongs() {
      const { data } = await getPlayListDetail(this.toggleArr[0].id);
      this.songs = data.playlist;
    },
    showPopup() {
      this.$bus.$emit("showPopup");
    },
    Search() {
      this.$router.push("/search");
    },
  },
};
</script>
<style scoped>
.discover-view {
  padding-bottom: 50px;
}
.van-cell {
  border: 1px solid #cfd3f6;
  border-radius: 20px;
  margin: 8px 0px;
  padding: 2px 16px;
  background-color: #f0e5f5;
}

.banner {
  padding: 10px;
  background-color: #f8f3f7;
}

.van-nav-bar,
.nav-icon {
  background-color: #f8eff2;
}
.nav-icon {
  padding: 0px;
}

.custom-indicator {
  position: absolute;
  left: 50%;
  bottom: 0;
  border-radius: 3px;
  padding: 2px 10px;
  background: #f7ecf0;
}
.left {
  transform: translate(-100%);
}
:deep(.activedCurrent) {
  background: #fd8284;
}

.songListBox {
  padding: 10px;
  background-color: #f8f9fd;
}
/* 样式穿透-用于修改vant默认样式 */
:deep(.van-grid-item__content) {
  background-color: #f8f9fd;
}
/* 修改相关导航的字体大小 */
:deep(.van-grid-item__text) {
  font-size: 14px;
}
</style>
