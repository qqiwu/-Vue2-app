<template>
  <div class="song-item" @click="handler">
    <van-image
      width="50"
      height="50"
      v-if="song.al"
      :src="song.al.picUrl"
      radius="5px"
    />
    <div class="centent">
      <h4 class="song-name w100">{{ song.name }}</h4>
      <div class="auth w100" v-if="song.ar">{{ song.ar[0].name }}</div>
    </div>
    <div class="pt5">
      <slot name="icon"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "song-item",
  data() {
    return {};
  },
  props: {
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
      this.$emit("click", this.song);
    },
  },
};
</script>
<style scoped>
.song-item {
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
}
.centent {
  margin-left: 5px;
  flex: 1;
  line-height: 22px;
  padding-top: 2px;
}
.w100 {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.auth {
  color: rgb(200, 203, 201);
  font-size: 12px;
}
.song-name {
  font-size: 14px;
}
.pt5 {
  padding-top: 5px;
}
</style>
