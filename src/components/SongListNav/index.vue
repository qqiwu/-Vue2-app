<template>
  <div class="song-list-nav">
    <header class="header">
      <h3>{{ title }} <van-icon name="arrow" size="14" /></h3>
      <van-icon name="ellipsis" />
    </header>
    <scroll>
      <div class="content">
        <item v-for="item in list" :key="item.id" :playlist="item"></item>
      </div>
    </scroll>
  </div>
</template>

<script>
import item from "./item.vue";
// 引入better-scroll使用
// import BetterScroll from "better-scroll"
import scroll from "@/components/public/scroll.vue";

export default {
  name: "song-list-nav",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "无名歌单",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {},
  components: {
    item,
    scroll,
  },
  created() {
    // this.$nextTick(function () {
    //   new BetterScroll(this.$refs.warp, {
    //     click: true,//是否允许点击
    //     scrollX: true //横向滚动
    //   })
    // })
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: row;
  width: 1160px;
}

.header {
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
  font-size: 14px;
}

.header > h3 {
  flex: 1;
  text-align: left;
  margin: 0px;
}
:deep(.van-icon-ellipsis) {
  transform: rotate(90deg);
  color: #9096a1;
  font-weight: 800;
}
</style>
