<template>
  <div class="hot-songs">
    <div class="header">
      <div class="header-left">
        <h3>
          <van-icon name="replay" size="20" @click="handler" />
          {{ title }}
        </h3>
        <van-button
          color="#ebeff2"
          icon="play"
          class="play-btn"
          round
          size="mini"
        >
          播放
        </van-button>
      </div>
      <van-icon name="ellipsis" />
    </div>
    <van-swipe class="content" :show-indicators="false">
      <list-item
        v-for="i in 5"
        :key="i"
        :list="songs.slice(i * 3, (i + 1) * 3)"
      ></list-item>
    </van-swipe>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";

export default {
  name: "hot-songs",
  data() {
    return {};
  },
  props: {
    title: {
      default: "热门歌曲",
      type: String,
    },
    songs: {
      default: () => [],
      type: Array,
    },
  },
  computed: {},
  components: {
    ListItem,
  },
  created() {},
  mounted() {},
  methods: {
    handler() {
      this.$emit("click");
    },
  },
};
</script>
<style scoped>
.play-btn > .van-button__content {
  color: #000 !important;
  font-size: 12px;
  font-weight: 600;
}

.header {
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  margin: 5px 0px;
  align-items: center;
  font-size: 14px;
}

.header-left {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.header h3 {
  margin: 0px;
}

.play-btn {
  margin-left: 5px;
}
:deep(.van-icon-ellipsis) {
  transform: rotate(90deg);
  color: #9096a1;
  font-weight: 800;
}
.hot-songs {
  background-color: #f8f9fd;
}
</style>
