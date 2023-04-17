<template>
  <van-row class="song_item">
    <van-col span="3" class="index pt10">
      {{ index }}
    </van-col>
    <van-col span="17" v-if="song.id" class="title_content" @click="handler">
      <div class="title">{{ song.name }}</div>
      <div class="msg">
        <van-icon :name="require('@/assets/sq.png')" v-if="song.sq"></van-icon>
        {{ song.ar[0].name }} - {{ song.al.name }}
      </div>
    </van-col>
    <van-col span="2" class="pt13">
      <van-icon
        :name="require('@/assets/videoPlay.png')"
        v-if="song.mv"
        size="20"
      ></van-icon>
    </van-col>
    <van-col span="2" class="pt13">
      <van-icon name="ellipsis" size="20"></van-icon>
    </van-col>
  </van-row>
</template>

<script>
export default {
  name: "song_item",
  data() {
    return {};
  },
  props: {
    index: {
      type: Number,
      default: 0,
    },
    song: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {
    handler() {
      this.$router.push({ name: "play" });
      // song.id 通过vuex来更改对应的id以及存入对应的song
      this.$store.dispatch("toggleSong", this.song.id);
      // 存储对应的歌曲
      this.$store.dispatch("addPlayList", this.song);
    },
  },
};
</script>
<style scoped>
.title {
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #000;
}
.msg {
  color: #ccc;
  font-size: 12px;
  height: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 16px;
}
.song_item {
  padding: 8px 0px;
}
.index {
  color: rgb(153, 153, 153);
  font-weight: 600;
  padding-left: 8px;
  padding-top: 10px;
}
.pt13 {
  padding-top: 13px;
}
.title_content {
  line-height: 20px;
}
</style>
