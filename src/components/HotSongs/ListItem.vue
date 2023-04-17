<template>
  <van-swipe-item v-if="list.length">
    <song-item
      v-for="item in list"
      :key="item.id"
      :song="item"
      @click="handler"
    >
      <template #icon>
        <van-icon
          :name="require('@/assets/videoPlay.png')"
          v-if="item.mv"
          size="30"
        />
      </template>
    </song-item>
  </van-swipe-item>
</template>

<script>
import SongItem from "../public/SongItem.vue";

export default {
  name: "",
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {},
  components: {
    SongItem,
  },
  created() {},
  mounted() {},
  methods: {
    handler(song) {
      this.$router.push({ name: "play" });
      // song.id 通过vuex来更改对应的id以及存入对应的song
      this.$store.dispatch("toggleSong", song.id);
      // 存储对应的歌曲
      this.$store.dispatch("addPlayList", song);
    },
  },
};
</script>
<style scoped></style>
