<template>
  <audio ref="audio" :src="src" />
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  computed: {},
  components: {},
  created() {},
  mounted() {
    // Loadstart:开始载入音频时触发
    this.$refs.audio.onloadstart = () => {
      this.$emit("loadstart", this.$refs.audio.duration);
    };
    // duracyionchange:duration属性更新时触发
    this.$refs.audio.onduracyionchange = () => {
      this.$emit("duracyionchange", this.$refs.audio.duration);
    };
    // Loadeddata:音频的第一帧加载完成时触发，此时整个音频还未加载完
    this.$refs.audio.onloadeddata = () => {
      this.$emit("loadeddata", this.$refs.audio.duration);
    };
    // Loadedmetadata:音频元数据加载完成时触发
    this.$refs.audio.onloadedmetadata = () => {
      this.$emit("loadedmetadata", this.$refs.audio.duration);
    };
    // Progress:音屏正在加载时触发
    this.$refs.audio.onprogress = () => {
      this.$emit("progress", this.$refs.audio.duration);
    };
    // canplay:浏览器能够开始播放音频时触发
    this.$refs.audio.oncanplay = () => {
      // 直接播放
      if (!this.paused) {
        // 默认为false开始播放
        this.play();
      } else {
        // 为true不播放
        this.pause();
      }
      this.$emit("canplay", this);
    };
    // Canplaythrough:浏览器预计在不停下来进行缓冲的情况下，能够持续播放指定的音频时会触发
    this.$refs.audio.oncanplaythrough = () => {
      this.$emit("canplaythrough", this);
    };
    // 播放结束
    this.$refs.audio.onended = () => {
      this.$emit("ended", this);
    };
    // 播放错误
    this.$refs.audio.onerror = (err) => {
      this.$emit("error", err);
    };
    // 时间更改
    this.$refs.audio.ontimeupdate = () => {
      this.$emit("timeupdate", this.$refs.audio.currentTime);
    };
    // 音量更改
    this.$refs.audio.onvolumechange = () => {
      this.$emit("volumechange", this.$refs.audio.volume);
    };
  },
  props: {
    // 播放路径
    src: {
      type: String,
      default: "",
    },
    // 是否静音
    muted: {
      type: Boolean,
      default: false,
    },
    // 循环播放
    loop: {
      type: Boolean,
      default: false,
    },
    // 当前时间
    currentTime: {
      type: Number,
      default: 0,
    },
    // 是否暂停
    paused: {
      type: Boolean,
      default: false,
    },
    // 音量
    volume: {
      type: Number,
      default: 0,
    },
    // 播放速度
    playbackRate: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    play() {
      if (this.$refs.audio) {
        this.$refs.audio.play();
      }
    },
    pause() {
      if (this.$refs.audio) {
        this.$refs.audio.pause();
      }
    },
  },
  watch: {
    // props传参第一个不会触发对应的watch  (第一个次传参不会触发watch 需要immediate来帮助触发)
    // 是否静音
    muted: {
      handler(newValue) {
        if (newValue) {
          this.$refs.audio.muted = newValue;
        }
      },
      immediate: true,
    },
    // 循环播放
    loop: {
      handler(newValue) {
        if (newValue) {
          this.$refs.audio.loop = newValue;
        }
      },
      immediate: true,
    },
    // 当前时间
    currentTime: {
      handler(newValue) {
        if (newValue) {
          this.$refs.audio.currentTime = newValue;
        }
      },
      immediate: true,
    },
    // 是否暂停
    paused: {
      handler(newValue) {
        if (newValue) {
          this.pause();
        } else {
          this.play();
        }
      },
      immediate: true,
    },
    // 音量
    volume: {
      handler(newValue) {
        if (newValue) {
          this.$refs.audio.volume = newValue;
        }
      },
      immediate: true,
    },
    // 播放速度
    playbackRate: {
      handler(newValue) {
        if (newValue) {
          this.$refs.audio.playbackRate = newValue;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped></style>
