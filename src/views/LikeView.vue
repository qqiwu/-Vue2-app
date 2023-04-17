<template>
  <div class="song-list">
    <!-- 头部 -->
    <header class="header">
      <van-nav-bar
        title="我喜欢的音乐"
        left-arrow
        :border="false"
        fixed
        @click-left="$router.go(-1)"
        :style="{ color: '#fff' }"
      >
      </van-nav-bar>
    </header>

    <!-- 底部 -->
    <footer class="warp">
      <van-row class="footer_header">
        <van-col span="3">
          <div @click="addListToPlay">
            <van-icon :name="require('@/assets/d_e.png')" size="25"></van-icon>
          </div>
        </van-col>
        <van-col span="17">
          <h4>
            播放全部
            <span class="count" v-if="songs.tracks"
              >({{ playlist.tracks.length }})</span
            >
          </h4>
        </van-col>
        <van-col span="2">
          <van-icon :name="require('@/assets/dbz.png')"></van-icon>
        </van-col>
        <van-col span="2">
          <van-icon :name="require('@/assets/list.png')"></van-icon>
        </van-col>
      </van-row>
      <div>
        <!-- <ul>
          <li v-for="song in songs" :key="song.id">
            {{ song.name }} - {{ song.artist }}
          </li>
        </ul> -->
        <song-item-com
          v-for="(item, index) in songs"
          :song="item"
          :key="item.id"
          :index="index + 1"
        ></song-item-com>
      </div>
    </footer>
  </div>
</template>

<script>
import SongItemCom from "@/components/SongItemCom/index.vue";
// import { getUserRecord } from "@/api";
import { likeSongs, getSongDetail } from "@/api";

export default {
  data() {
    return {
      playlist: [],
      songs: [],
    };
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  computed: {},
  components: {
    SongItemCom,
  },
  created() {},
  mounted() {
    this.fetchLikedSongs();
  },
  methods: {
    addListToPlay() {
      // 添加到播放列表
      this.$store.dispatch("addPlayList", this.playlist.tracks);
      // 切换歌曲
      this.$store.dispatch("toggleSong", this.playlist.tracks[0].id);
    },
    fetchLikedSongs() {
      const accountValue = localStorage.getItem("account"); // 从local storage 中获取account键的值
      const accountObj = JSON.parse(accountValue); // 将JSON字符串解析为JavaScript对象
      const uid = accountObj.id; // 获取id值
      console.log(uid);
      const cookie = localStorage.getItem("cookie");
      console.log(cookie);

      if (!uid || !cookie) {
        console.error("找不到uid或cookie");
        return;
      }

      likeSongs(`uid=${uid}`).then((res) => {
        console.log(res.data.ids);

        const ids = res.data.ids.join(",");
        console.log(ids);

        getSongDetail(ids).then((detailRes) => {
          console.log(detailRes.data.songs);

          // 将获取的歌曲信息转化成对象
          const songsObj = detailRes.data.songs.reduce((obj, song) => {
            obj[song.id] = song;
            return obj;
          }, {});

          // 将对象转化成数组，并设置到组件的 songs 属性上
          this.songs = Object.values(songsObj);
          console.log(this.songs);
        });
      });
    },
  },
  activated() {},
};
</script>
<style scoped>
.warp {
  margin-top: 50px;
}
.warp_content {
  padding: 10px 20px;
  padding-top: 60px;
  background-image: linear-gradient(
    -30deg,
    rgb(139, 139, 139),
    rgb(100, 100, 100)
  );
}

.header .van-nav-bar {
  background-color: #1f2642;
}

.box {
  color: #fff;
  font-size: 12px;
}

.mt10 {
  margin-top: 10px;
}

.warp_top {
  color: #000;
  letter-spacing: 1px;
  background: rgb(230, 230, 230);
  padding: 6px;
  transform: translateY(-10px);
  border-radius: 8px 8px 0px 0px;
  font-size: 14px;
}

.disc {
  width: 100%;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  color: #ccc;
}

.toArrow {
  color: #ccc;
  font-size: 12px;
  letter-spacing: 0;
}

.title {
  font-size: 14px;
  line-height: 25px;
  min-height: 50px;
  font-weight: 500;
}

.content-left-header {
  line-height: 20px;
  display: flex;
  justify-items: center;
  padding: 5px 0;
}

.content-left-header > span {
  margin: 0px 5px;
}

.gz {
  height: 20px;
  border-radius: 5px;
  background-color: rgb(157, 157, 157);
  font-size: 10px;
  padding: 2px;
}

.btns > .van-button {
  margin-right: 5px;
}

.right-content {
  padding-left: 10px;
}

.btn {
  background-color: rgb(157, 157, 157);
  border-radius: 10px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  margin: 10px;
}

.tags {
  display: flex;
  flex-direction: row;
}

.tags .tag {
  background: rgb(157, 157, 157);
  padding: 2px 4px;
  border-radius: 1px;
  font-size: 10px;
  margin-right: 5px;
}

.more {
  padding-top: 2px;
}

.iconGo {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ff0000;
  color: #ff0000;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
}

.count {
  font-size: 12px;
  color: #ccc;
  font-weight: normal;
}

.warp {
  padding: 0px 10px;
}
::v-deep .van-nav-bar__title,
.header .van-icon,
::v-deep .van-nav-bar__arrow {
  color: #fff;
}
h4 {
  font-size: 16px;
}
</style>
