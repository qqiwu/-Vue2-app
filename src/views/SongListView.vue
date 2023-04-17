<template>
  <div class="song-list">
    <!-- 头部 -->
    <header class="header">
      <van-nav-bar
        title="歌单"
        left-arrow
        :border="false"
        fixed
        @click-left="$router.go(-1)"
        :style="{ color: '#fff' }"
      >
        <template #right>
          <van-icon name="search" size="18" />
          <van-icon name="ellipsis" size="18" />
        </template>
      </van-nav-bar>
    </header>
    <!-- 中间部分 -->
    <div class="warp_content box">
      <van-row>
        <van-col span="7">
          <itemVue :url="playlist.coverImgUrl" :count="playlist.playCount">
          </itemVue>
        </van-col>
        <van-col span="17" class="right-content">
          <h3 class="title">{{ playlist.name }}</h3>
          <div class="content-left-header" v-if="playlist.creator">
            <van-image
              width="20"
              height="20"
              round
              :src="playlist.creator.avatarUrl"
            />
            <span>{{ playlist.creator.nickname }}</span>
            <div class="gz">
              <van-icon name="plus" />
              关注
            </div>
          </div>
          <div class="tags">
            <div class="tag" v-for="tag in playlist.tags" :key="tag">
              <span>{{ tag }}</span>
              <van-icon name="arrow" />
            </div>
          </div>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24" class="mt10">
          <van-row>
            <van-col span="23">
              <p v-html="playlist.description" class="disc"></p>
            </van-col>
            <van-col span="1" class="more">
              <van-icon name="arrow" size="12" />
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">
          <div class="btn">
            <van-icon name="share-o" />
            {{ playlist.shareCount }}
          </div>
        </van-col>
        <van-col span="8">
          <div class="btn">
            <van-icon name="chat-o" />
            {{ playlist.commentCount }}
          </div>
        </van-col>
        <van-col span="8">
          <div class="btn">
            <van-icon name="add-square" />
            {{ playlist.trackCount }}
          </div>
        </van-col>
      </van-row>
    </div>
    <van-row class="warp_top">
      <van-col span="2">
        <div class="iconGo">
          <span>冲</span>
        </div>
      </van-col>
      <van-col span="17"> 购黑胶最低享0.24元/天! </van-col>
      <van-col span="5" class="toArrow">
        <span>来抽大奖 <van-icon name="arrow"></van-icon></span>
      </van-col>
    </van-row>
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
            <span class="count" v-if="playlist.tracks"
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
        <song-item-com
          v-for="(item, index) in playlist.tracks"
          :song="item"
          :key="item.id"
          :index="index + 1"
        ></song-item-com>
      </div>
    </footer>
  </div>
</template>

<script>
import itemVue from "@/components/public/item.vue";
import SongItemCom from "@/components/SongItemCom/index.vue";
import { getPlayListDetail } from "@/api";

export default {
  name: "song-list",
  data() {
    return {
      playlist: [],
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
    itemVue,
    SongItemCom,
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    async getData() {
      const { data } = await getPlayListDetail(this.id);
      this.playlist = data.playlist;
    },
    addListToPlay() {
      // 添加到播放列表
      this.$store.dispatch("addPlayList", this.playlist.tracks);
      // 切换歌曲
      this.$store.dispatch("toggleSong", this.playlist.tracks[0].id);
    },
  },
  activated() {
    this.getData();
  },
};
</script>
<style scoped>
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
  background-color: transparent !important;
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
