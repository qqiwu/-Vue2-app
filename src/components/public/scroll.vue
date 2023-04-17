<template>
  <div class="scroll-com warp" ref="warp">
    <!-- 接收对应的需要滚动的内容 -->
    <slot></slot>
  </div>
</template>

<script>
// 引入better-scroll使用
import BetterScroll from "better-scroll";

export default {
  name: "scroll-com",
  data() {
    return {};
  },
  computed: {},
  components: {},
  created() {},
  mounted() {
    this.$nextTick(function () {
      // 实例化
      this.bscroll = new BetterScroll(this.$refs.warp, {
        click: this.click, // 是否允许点击
        scrollX: this.scrollX, // 横向滚动
        scrollY: this.scrollY, // 纵向滚动
        probeType: this.probeType, // 监听派发scroll事件
        startX: this.startX, // 开始x坐标
        startY: this.startY, // 开始y坐标
        freeScroll: this.freeScroll, // 是否允许横向纵向同时滚动
        bounce: this.bounce, // 抖动动画
        bounceTime: this.bounceTime, // 抖动动画事件
        preventDefault: this.preventDefault, // 禁止浏览器默认行为
        zoom: this.zoom, // 缩放
        pullUpLoad: this.pullUpLoad, // 上拉加载
      });
      this.bscroll.refresh();
      // 监听事件
      // 开始事件
      this.bscroll.on("beforeScrollStart", () => {
        this.$emit("beforeScrollStart");
      });
      this.bscroll.on("scrollStart", () => {
        this.$emit("scrollStart");
      });
      // 滚动的事件
      this.bscroll.on("scroll", (point) => {
        this.$emit("scroll", point);
      });
      // 滚动结束
      this.bscroll.on("scrollEnd", (point) => {
        this.$emit("scrollEnd", point);
      });
      // 手滑结束
      this.bscroll.on("touchEnd", (point) => {
        this.$emit("touchEnd", point);
      });
      this.bscroll.on("flick", () => {
        this.$emit("flick");
      });
      this.bscroll.on("refresh", () => {
        this.$emit("refresh");
      });
      // 下拉
      // this.bscroll.on("pullingDown", () =>  {
      //   this.$emit('pullingDown');
      // })
      // //上拉
      // this.bscroll.on("pullingUp", () =>  {
      //   this.$emit('pullingUp');
      // })
    });
  },
  props: {
    click: {
      type: Boolean,
      default: true,
    },
    scrollX: {
      type: Boolean,
      default: true,
    },
    scrollY: {
      type: Boolean,
      default: false,
    },
    // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
    // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；（在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测。）
    // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。( 就是我们用手用力滑动的时候，手放开之后，屏幕还在滑动，这就叫momentum 滚动动画 )
    probeType: {
      type: Number,
      default: 1,
    },
    startX: {
      type: Number,
      default: 0,
    },
    startY: {
      type: Number,
      default: 0,
    },
    // 同时支持横向和纵向滚动
    freeScroll: {
      type: Boolean,
      default: false,
    },
    // 回弹动画
    bounce: {
      type: Boolean,
      default: true,
    },
    bounceTime: {
      type: Number,
      default: 800,
    },
    preventDefault: {
      type: Boolean,
      default: true,
    },
    // 缩放
    zoom: {
      type: Boolean || Object,
      default: true,
    },
    // 上拉加载
    pullUpLoad: {
      type: Boolean || Object,
      default: false,
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    // x坐标
    x: {
      default: 0,
      type: Number,
    },
    // y坐标
    y: {
      default: 0,
      type: Number,
    },
    time: {
      default: 500,
      type: Number,
    },
  },
  methods: {
    scrollToElement(element, time = 500) {
      if (this.bscroll) {
        this.bscroll.scrollToElement(element, time);
      }
    },
    scrollTo(x, y, time) {
      if (this.bscroll) {
        this.bscroll.scrollTo(x, y, time);
      }
    },
  },
  watch: {
    width: {
      handler(newValue, oldValue) {
        if (newValue) {
          if (newValue <= 0) {
            this.width = 0;
          } else if (newValue == oldValue) {
          } else {
            this.$nextTick(() => {
              this.$refs.warp.style.width = Number(newValue)
                ? `${newValue}px`
                : newValue;
            });
          }
        }
      },
      immediate: true,
    },
    height: {
      handler(newValue, oldValue) {
        if (newValue) {
          if (newValue <= 0) {
            this.height = 0;
          } else if (newValue == oldValue) {
          } else {
            this.$nextTick(() => {
              this.$refs.warp.style.height = Number(newValue)
                ? `${newValue}px`
                : newValue;
            });
          }
        }
      },
      immediate: true,
    },
    x: {
      handler(newX, oldX) {
        if (newX) {
          if (newX < 0) {
            throw new Error("当前x坐标不能为0");
          }
          if (newX != oldX) {
            this.bscroll.scrollTo(newX, this.y, this.time);
          }
        }
      },
      immediate: true,
    },
    y: {
      handler(newY, oldY) {
        if (newY) {
          if (newY < 0) {
            throw new Error("当前x坐标不能为0");
          }
          if (newY != oldY) {
            this.bscroll.scrollTo(this.x, newY, this.time);
          }
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
.warp {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
