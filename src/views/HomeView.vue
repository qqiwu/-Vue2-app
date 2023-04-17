<template>
  <div class="homeview">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar
      v-model="active"
      fixed
      border
      :style="{ background: 'rgb(249,250,252)' }"
      route
    >
      <van-tabbar-item
        v-for="item in tabbarItems"
        :key="item.title"
        replace
        :to="item.path"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.activeIcon : item.icon" />
        </template>
      </van-tabbar-item>
      <!--      主页侧边栏-->
      <van-popup
        v-model="show"
        position="left"
        :style="{ width: '80%', height: '100%' }"
      >
        <sidebar></sidebar>
      </van-popup>
    </van-tabbar>
    <div class="controller" v-show="$store.state.songList.id">
      <song-item @click="changeSongState" :song="song">
        <template #icon>
          <van-icon
            name="pause-circle-o"
            v-show="!$store.state.songList.isPaused"
            size="30"
          />
          <van-icon
            name="play-circle-o"
            v-show="$store.state.songList.isPaused"
            size="30"
          />
        </template>
      </song-item>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SongItem from "@/components/public/SongItem.vue";
import Sidebar from "@/components/Aside/Sidebar.vue";

export default {
  name: "home-view",
  data() {
    return {
      active: 0,
      tabbarItems: [
        {
          title: "发现",
          icon: require("@/assets/home/discover.png"), // 图片懒加载
          activeIcon: require("@/assets/home/discover_active.png"),
          path: "/discover",
        },
        {
          title: "播客",
          icon: require("@/assets/home/discover.png"), // 图片懒加载
          activeIcon: require("@/assets/home/discover_active.png"),
        },
        {
          title: "我的",
          icon: require("@/assets/home/my.png"), // 图片懒加载
          activeIcon: require("@/assets/home/my_active.png"),
          path: "/my",
        },
        {
          title: "关注",
          icon: require("@/assets/home/discover.png"), // 图片懒加载
          activeIcon: require("@/assets/home/discover_active.png"),
        },
        {
          title: "社区",
          icon: require("@/assets/home/discover.png"), // 图片懒加载
          activeIcon: require("@/assets/home/discover_active.png"),
        },
      ],
      show: false,
    };
  },
  computed: {
    ...mapState(["songList"]),
    song() {
      // 从列表中查找到对应的歌曲
      return this.songList.list.find((song) => song.id == this.songList.id);
    },
  },
  components: {
    SongItem,
    Sidebar,
  },
  created() {
    this.$bus.$on("showPopup", () => {
      this.show = true;
    });
  },
  mounted() {},
  methods: {
    ...mapActions(["changeSongState"]),
  },
};
</script>
<style scoped>
.van-tabbar-item--active {
  background-color: rgb(249, 250, 252);
}
</style>
