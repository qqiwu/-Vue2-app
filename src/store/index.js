import VueX from "vuex";
import Vue from "vue";
import { Toast } from "vant";
import format from "@/util/formatLyric";
import { getSongDetail, getSonglyric } from "@/api";
// 中间件使用
Vue.use(VueX);

// 核心对象 Store
const store = new VueX.Store({
  state: {
    msg: "hello",
    songList: {
      isPaused: false,
      volume: 0.5,
      playbackRate: 1,
      list: [],
      id: "",
      // 歌曲歌词
      song: {},
      lyric: {},
      show: false,
    },
    cookie: "",
    user: {
      // uid: localStorage.getItem("uid") || "",
      cookie: localStorage.getItem("cookie") || "",
      profile: localStorage.getItem("profile") || "",
      account: localStorage.getItem("account") || "",
    },
    account: {},
  },
  actions: {
    // 第一个参数为对应的对象(store对象) 第二个参数为传递的数据
    changeMsg(store, payload) {
      store.commit("moduleA/CHANGCOUNT");
      store.commit("CHANGEMSG", payload);
    },
    changeSongState(store) {
      store.commit("CHANGESONGSTATE");
    },
    addPlayList(store, payload) {
      store.commit("ADDPALYLIST", payload);
    },
    async toggleSong(store, payload) {
      var { data } = await getSongDetail(payload);
      const song = data.songs[0];
      var { data } = await getSonglyric(payload);
      const lrcString = data.lrc.lyric;
      const lyric = format(lrcString);
      store.commit("TOGGLELYRIC", lyric);
      store.commit("TOGGLECURRSONG", song);
      store.commit("TOGGLESONG", payload);
    },
    nextSong(store) {
      const { list } = store.state.songList;
      const index = list.findIndex(({ id }) => id == store.state.songList.id);
      if (index == list.length - 1) {
        if (list.length) {
          Toast({
            message: "当前已经是最后一首了",
            icon: "smile-o",
          });
        }
      } else {
        store.dispatch("toggleSong", list[index + 1].id);
      }
    },
    prevSong(store) {
      const { list } = store.state.songList;
      const index = list.findIndex(({ id }) => id == store.state.songList.id);
      if (index == 0) {
        if (list.length) {
          Toast({
            message: "当前已经是第一首了",
            icon: "smile-o",
          });
        }
      } else {
        store.dispatch("toggleSong", list[index - 1].id);
      }
    },
    toggleCookie(store, payload) {
      store.commit("TOGGLECOOKIE", payload);
    },
    toggleAccount(store, payload) {
      store.commit("TOGGLEACCOUNT", payload);
    },
  },
  mutations: {
    // mutations里面的名字全部大写
    CHANGEMSG(state, payload) {
      state.msg = payload;
    },
    // 更改歌曲状态
    CHANGESONGSTATE(state) {
      state.songList.isPaused = !state.songList.isPaused;
    },
    // 添加歌曲到播放列表
    ADDPALYLIST(state, payload) {
      state.songList.list = state.songList.list.concat(payload);
    },
    // 切换歌曲
    TOGGLESONG(state, payload) {
      state.songList.id = payload;
    },
    TOGGLECURRSONG(state, payload) {
      state.songList.song = payload;
    },
    TOGGLELYRIC(state, payload) {
      state.songList.lyric = payload;
    },
    UPDATESHOW(state, payload) {
      state.songList.show = payload;
    },
    TOGGLECOOKIE(state, payload) {
      state.cookie = payload;
    },
    TOGGLEACCOUNT(state, payload) {
      state.account = payload;
    },
  },
  getters: {
    getMsg(state) {
      return state.msg;
    },
    lyric(state) {
      return state.songList.lyric;
    },
    song(state) {
      return state.songList.song;
    },
  },
  modules: {
    moduleA: {
      namespaced: true,
      state: {
        count: 10,
      },
      actions: {
        changeCount(store) {
          console.log(store.state.count);
        },
      },
      mutations: {
        CHANGCOUNT(state) {
          console.log(state.count);
        },
      },
    },
  },
});
export default store;
