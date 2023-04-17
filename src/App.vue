<template>
  <div id="app">
    <router-view />
    <audio-play
      @error="handlerError"
      @ended="nextSong"
      @loadedmetadata="handler"
      :currentTime="currentTime"
      @timeupdate="timeupdate"
      :src="songUrl"
      :paused="songList.isPaused"
    ></audio-play>
    <van-action-sheet v-model="$store.state.songList.show" title="播放列表">
      <div class="content">
        <song-item
          v-for="item in $store.state.songList.list"
          :key="item.id"
          :song="item"
          @click="playSong"
        >
          <template #icon>
            <van-icon
              name="pause-circle-o"
              v-show="
                item.id == $store.state.songList.id &&
                !$store.state.songList.isPaused
              "
              size="30"
            />
            <van-icon
              name="play-circle-o"
              v-show="
                !(
                  item.id == $store.state.songList.id &&
                  !$store.state.songList.isPaused
                )
              "
              size="30"
            />
          </template>
        </song-item>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import { Toast } from "vant";
import { mapActions, mapState } from "vuex";
import AudioPlay from "./components/public/AudioPlay.vue";
import SongItem from "@/components/public/SongItem.vue";
import { getSongUrl } from "@/api/index";

export default {
  name: "app",
  components: {
    AudioPlay,
    SongItem,
  },
  data() {
    return {
      currentTime: 0,
      songUrl: "",
    };
  },
  created() {
    this.$bus.$on("rangeChange", (time) => {
      this.currentTime = time;
    });
  },
  computed: {
    ...mapState(["songList"]),
  },
  methods: {
    ...mapActions(["nextSong", "changeSongState", "toggleSong"]),
    handler(duration) {
      this.$bus.$emit("load", duration);
    },
    timeupdate(time) {
      this.$bus.$emit("timeupdate", time);
    },
    handlerError() {
      Toast({
        message: "加载出错",
        icon: require("@/assets/loadError.png"),
      });
      this.nextSong();
    },
    playSong(song) {
      if (song.id == this.$store.state.songList.id) {
        this.changeSongState();
      } else {
        this.toggleSong(song.id);
        this.$store.state.songList.isPaused = false;
      }
    },
    async getSongUrlHandler() {
      const res = await getSongUrl(this.songList.id, "exhigh");
      if (res.code === 200 && res.data && res.data.length > 0) {
        this.songUrl = res.data[0].url;
        console.log(res.data[0].url);
      } else {
        console.log("获取歌曲url失败");
      }
    },
  },
  watch: {
    "songList.id": {
      handler() {
        this.getSongUrlHandler();
      },
    },
  },
};
</script>

<style>
.controller {
  background: #f9fafc;
  padding-bottom: 50px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 50px;
}
</style>
