<template>
  <div class="play-view">
    <!-- 遮罩 -->
    <div
      class="m-song-bg"
      v-if="song.al"
      :style="`background-image: url(${song.al.picUrl});`"
    ></div>
    <!-- 头部 -->
    <van-nav-bar fixed :border="false" class="pt10" z-index="999">
      <template #left>
        <van-icon
          name="arrow-down"
          size="24"
          color="#fff"
          @click="$router.go(-1)"
        />
      </template>

      <template #title>
        <div class="titleBox">
          <van-icon name="vip-card-o" size="18" color="#fff" />{{ song.name }}
        </div>
        <div class="authBox">
          <span style="padding-top: 2px" v-if="song.ar">{{
            song.ar[0].name
          }}</span>
          <div class="gz">关注</div>
        </div>
      </template>
      <template #right>
        <van-icon :name="require('@/assets/dfy.png')" size="24" />
      </template>
    </van-nav-bar>
    <!-- 内容部分 -->
    <div class="content">
      <div class="cdBox" @click="isShow = !isShow" v-if="isShow">
        <!-- cd -->
        <div class="m-song-disc">
          <div
            class="m-song-turn"
            :class="{
              stop: $store.state.songList.isPaused,
            }"
          >
            <div class="m-song-rollwrap">
              <div class="m-song-img">
                <img
                  class="u-img"
                  alt="song-img"
                  v-if="song.al"
                  :src="song.al.picUrl"
                />
              </div>
            </div>
            <div class="m-song-lgour">
              <div class="m-song-light"></div>
            </div>
          </div>
          <span
            class="m-song-plybtn"
            v-show="$store.state.songList.isPaused"
          ></span>
        </div>
        <!-- 控制栏 -->
        <div class="btnNav">
          <div>
            <van-icon name="like-o" color="#fff" size="18"></van-icon>
          </div>
          <div>
            <van-icon
              :name="require('@/assets/dl.png')"
              color="#fff"
              size="18"
            ></van-icon>
          </div>
          <div>
            <van-icon
              :name="require('@/assets/users.png')"
              color="#fff"
              size="18"
            ></van-icon>
          </div>
          <div>
            <van-icon
              :name="require('@/assets/msg.png')"
              color="#fff"
              badge="1w+"
              size="18"
            ></van-icon>
          </div>
          <div>
            <van-icon
              :name="require('@/assets/more.png')"
              color="#fff"
              size="18"
            ></van-icon>
          </div>
        </div>
      </div>
      <div class="lyricBox" @click="isShow = !isShow" v-if="!isShow">
        <van-row>
          <van-col span="2">
            <van-icon name="volume-o" size="18"></van-icon>
          </van-col>
          <van-col span="20">
            <div class="switchBox">
              <div>歌词</div>
              <div>百科</div>
            </div>
          </van-col>
          <van-col span="2">
            <van-icon :name="require('@/assets/tp.png')" size="18"></van-icon>
          </van-col>
        </van-row>
        <div class="context_box">
          <scroll :scrollX="false" :scrollY="true" :height="250" ref="bscroll">
            <div
              class="lyricList"
              :style="{ height: lyric.lyricArr.length * 24 + 'px' }"
              ref="lyricList"
            >
              <div
                v-for="(item, index) in lyric.lyricArr"
                :class="{
                  activeLine: isActive(
                    lyric.timeArr[index],
                    lyric.timeArr[index + 1] || duration,
                    index
                  ),
                }"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
          </scroll>
        </div>
        <van-row>
          <van-col span="4">
            <van-row>
              <van-col span="12">
                <van-icon name="like-o" size="18"></van-icon>
              </van-col>
              <van-col span="12">
                <van-icon
                  name="play-circle-o"
                  size="18"
                  v-if="song.mv"
                ></van-icon>
              </van-col>
            </van-row>
          </van-col>
          <van-col span="4" offset="16">
            <van-row>
              <van-col span="12">
                <van-icon name="flower-o" size="18"></van-icon>
              </van-col>
              <van-col span="12">
                <van-icon name="more-o" size="18"></van-icon>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </div>
      <div class="control-box">
        <div class="rangeBox">
          <span class="startTime">{{ currentTime | formatTime }}</span>
          <input
            type="range"
            :value="(currentTime / duration) * 100 || 0"
            @change="handlerRangeChange"
          />
          <span class="endTime">{{
            (duration - currentTime) | formatTime
          }}</span>
        </div>
        <div class="btnNav">
          <div>
            <van-icon
              :name="require('@/assets/dolphin_mix_shuffle.png')"
              color="#fff"
              size="26"
            ></van-icon>
          </div>
          <div @click="prevSong">
            <van-icon
              :name="require('@/assets/dci.png')"
              color="#fff"
              size="26"
            ></van-icon>
          </div>
          <div class="play" @click="changeSongState()">
            <van-icon
              :name="require('@/assets/d_u.png')"
              color="#fff"
              size="34"
              v-show="!$store.state.songList.isPaused"
            ></van-icon>
            <van-icon
              :name="require('@/assets/d_v.png')"
              color="#fff"
              size="34"
              v-show="$store.state.songList.isPaused"
            ></van-icon>
          </div>
          <div @click="nextSong">
            <van-icon
              :name="require('@/assets/dcj.png')"
              color="#fff"
              size="26"
            ></van-icon>
          </div>
          <div @click="handlerShow">
            <van-icon
              :name="require('@/assets/du8.png')"
              color="#fff"
              size="26"
            ></van-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Scroll from "../components/public/scroll.vue";
import formatTime from "@/util/formatTime";

export default {
  name: "play-view",
  data() {
    return {
      isShow: true,
      // song: {},
      // lyric: {},
      duration: 0,
      currentTime: 0,
      index: 0,
    };
  },
  computed: {
    ...mapGetters(["song", "lyric"]),
  },
  components: {
    Scroll,
  },
  async created() {
    // 监听
    this.$bus.$on("load", (duration) => {
      this.duration = duration;
    });
    this.$bus.$on("timeupdate", (time) => {
      this.currentTime = time;
    });
    // 数据接收
  },
  mounted() {},
  methods: {
    ...mapActions(["changeSongState", "nextSong", "prevSong"]),
    handlerRangeChange(e) {
      const v = e.target.value;
      this.$bus.$emit("rangeChange", (v * this.duration) / 100);
    },
    isActive(start, end, index) {
      // 当前时间
      const { currentTime } = this;
      if (currentTime >= start && currentTime < end) {
        this.index = index;
        return true;
      }
      return false;
    },
    handlerShow() {
      console.log("打开播放列表");
      this.$store.commit("UPDATESHOW", true);
    },
  },
  filters: {
    formatTime,
  },
  watch: {
    index(newValue) {
      // 滚动
      this.$nextTick(() => {
        this.$refs.bscroll.scrollToElement(
          this.$refs.lyricList.children[newValue]
        );
      });
    },
  },
};
</script>
<style scoped>
.pt10 {
  padding-top: 10px;
}

.u-img {
  width: 100%;
}

.context_box {
  margin-top: 150px;
}

.box {
  height: 400px;
}

.lyricBox {
  padding: 10px 20px;
}

.lyricList {
  padding-bottom: 200px;
}

.lyricList > div {
  text-align: center;
  color: #ccc;
  line-height: 24px;
}

.play > .van-icon {
  transform: translateY(-5px);
}

.switchBox {
  border-radius: 10px;
  width: 60px;
  padding: 2px;
  border: 1px solid #ccc;
  font-size: 10px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
}

.switchBox > div {
  flex: 1;
  text-align: center;
}

.btnNav {
  display: flex;
  flex-direction: row;
  padding: 20px;
  text-align: center;
  margin-top: 30px;
}

.btnNav > div {
  flex: 1;
}

.play-view {
  font-size: 12px;
  color: #fff;
  height: 100vh;
}

.titleBox {
  line-height: 24px;
  color: #fff;
  font-size: 14px;
}

.cdBox {
  margin-top: 70px;
}

.titleBox > .van-icon {
  margin-top: 10px;
  margin-right: 5px;
}

.activeLine {
  color: #fff !important;
}

.control-box {
  position: fixed;
  left: 5%;
  width: 90%;
  bottom: 0;
}

.rangeBox {
  display: flex;
  flex-direction: row;
  justify-items: center;
  color: #ccc;
  margin: 20px 0px;
}

.rangeBox > input {
  flex: 1;
  height: 2px;
  margin: 0px 5px;
  margin-top: 6px;
  background-image: linear-gradient(rgb(85, 85, 85), #bbb);
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  top: -5px;
  height: 8px;
  width: 8px;
  background: none repeat scroll 0 0 #fff;
  border-radius: 5px;
}

.authBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  line-height: 16px;
  color: #bcbcbc;
  font-size: 12px;
}

.gz {
  background: #bcbcbc;
  padding: 2px;
  border-radius: 2px;
  color: #fff;
  margin-left: 2px;
}

::v-deep .van-nav-bar {
  background-color: transparent !important;
}

.content {
  padding-top: 60px;
  position: relative;
  z-index: 9;
}

.m-song-bg {
  background-color: #161824;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  -webkit-transform: scale(1.5);
  -ms-transform: scale(1.5);
  transform: scale(1.5);
  -webkit-transform-origin: center;
  -ms-transform-origin: center;
  transform-origin: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  opacity: 1;
  transform: scale(1.5);
  transform-origin: center center;
  filter: blur(30px);
}

.m-song-bg:before {
  content: " ";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

/* cd机样式 */
.m-song-disc {
  position: relative;
  width: 248px;
  height: 248px;
  margin: 0 auto;
  font: 14px/1.5 Helvetica, sans-serif, STHeiTi;
  color: #333;
}

.m-song-wrap.m-ab-song .m-song-disc:after {
  width: 66px;
  height: 106px;
  top: -45px;
  left: 90px;
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  background: url(@/assets/needle-ab.png) no-repeat;
  background-size: contain;
}

.m-song-disc:after {
  content: " ";
  position: absolute;
  top: -63px;
  left: 107px;
  z-index: 5;
  width: 84px;
  height: 122px;
  background: url(@/assets/needle-ab.png) no-repeat;
  background-size: contain;
}

.m-song-turn:before {
  content: " ";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  background: url(@/assets/disc.png) no-repeat;
  background-size: contain;
}

.m-song-turn {
  width: 100%;
  height: 100%;
  animation: animateRotate 20s;
}

.m-song-rollwrap {
  width: 184px;
  height: 184px;
  margin: -92px 0 0 -92px;
}

.m-song-rollwrap {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
}

.m-song-lgour,
.m-song-light {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3;
}

.m-song-plybtn {
  width: 56px;
  height: 56px;
}

.m-song-plybtn {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 10;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAABJlBMVEUAAAAAAAD////l5eX///9iYmKDg4Pn5+f///9YWFj////09PT////4+Pjt7e3///////9oaGhBQUH////////////////CwsIaGhr///8xMTEkJCT////7+/vp6en///////////////+srKyoqKienp58fHz////y8vKTk5P///8EBAT////////////////V1dW3t7f////////////////////v7++jo6N9fX3///////+UlJT////s7Oz////Nzc3///////+RkZGPj495eXkTExP////////29vb////k5OTPz882Njb////////////c3Nz///////9ycnJsbGz///9dXV3////////Q0ND///9QUFD///////////////////9FeiN6AAAAYXRSTlNmAP3c+oWT3ueB9vA19ealRId5EQbuurpu83RxD/nh05dfAquooo+M7JtzaSolE+vMspJ3Wj7w6KSQj6ucKeXNxLWnmpmObVYd8t3axXZRSt7TvbKLideCeSzHnn4V3Nh6YarbPAAABlRJREFUeNrU14lWEmEYh/GXcdj3HQTZRCkS913UNE2zbLd9Oc/930Q2LmVpwPAC03MD/M5835n/IC6dkqHnzcVoZvdkLp2HfHruZDcTXWw+DyVdOilAt6uNjI8782Ua1W2XjTShtdDSmzRdlH6zFKq5bKQBTS5H57gqXJrP1tsb7kShkBPJFQoJ90a7np0vhblqLrrc8R7oQ4vVPZOLIp8mp8flzsanJ59FuMjcqxZdHVKFxvYDWK1lPQXpooInu4ZVYD/m6pAWNLn0DSvvekJ6KLHuxerb0qyrQwrQViV/oZzKSc/lpi6sgUrLdSN16MyWARBcOBWbnS4EAYytj67r1KGtqMUseaSvPCWLGr14u+pDZysmwFhc+i4+BmBWZgcATTXTFvO9qOS3qOlmShu68g7A6xa13F6A7yuq0ORnA9jZENU2dgDjc1IPGvMB4QNR7+AJ4IspQVObBjDmF+Wur6qxmdKAbpeBoEcGlCcIlLf7hx7lOzxOlYeaP+oTmmoYQFsGWhswGql+oMUMEInLgItHgEzRPvS43OHYVY+/fGwXGvIBkzKU6oAvZA8aywOPZEg9AvIxO9AXAZg4lKF1OAGBF71DX5jw5EyG2NkTMJ/3Co2ZcM8tQ819D8xYb9CVgA2nijSw0gs0tArBzk59aRBWQ91Dj30QjssIiofBd9wttFiGiTMZSWcTUC52B629Bg5lRB0Cr2tdQRvAfRlZ94FGN9AjA+oywupgHHWGzuRhTEbaGORnOkFTZYj4ZaT5I1BOdYBuAnEZcXFg89/QmAFtGXltMGL/ghZ9I7+g19fUV/wHtAJBvzggfxAqd0NXDPCII/KAsXIXNPXOIQd/efjvUndAmxB2xMH/zB+G5u3Qr2k4EMd0AOmvt0IrsCMOagcqt0FbJkyLg5oGs3ULNApecVReiP4NnTHALY7KDcbHv6BbDno1XTUGW39CWwa8F4flB6P1B3TRgQ/UeqSLN6GzAQd83f1dHAKzN6AfoCQOrARLN6Andr9GpiITT9/KwPLAye/QGATFTusAxsOCDKogxH6D7sOC2GkNq+B9GVALsP8LWgzAqdjJ4LJXCRlIpxAoXkOrtteT6yYmH8gg8kL1GroHU/1CoTSQBZ6CvSto0oRc/1DM7GNRLwdm8hK6DF5RgMI9j6jnheVLaBTWdaAwPy7KrUP0Alqbg4QWlPCU6JaAuZoFDcGaqEHh6RdRLQIhC/oBsppQzAXVN1UWlixoBjyqUIhozr8H3vyE1lYhpwnVnv8CpH9CZyAi2lAIPtK8pDPn0Cp8UoWqz/8zqJ5DGzCpCdWf/0lonEMzMK0J1Z//acicQ30wrgnVn/9x8LkkCWFRherPfxiSEgKvLlR//r0QkmWY14Xqz/88LEsTsqpQ/fm3RlQWoa4L1Z//OixKFNq6UP35vw9RycDGMKAYD3P9vEhlF9y6UP35d8OuvISELlR//hPwUqxh0oTqz781TbIKueFB4em4rb/Mq5IfMpRn0nOPIS+ADBUatvcz/w/0B/X2VgMACMNQ9AMnWOADKwT/QuahyZYcDcte7e146X9W+vFmWmEzOeOJGfjMCmWOEubMYw7no7wizHPHvMuMAMFIOo5IxsiOjJDLSOOM2cDYN44hxliMjGnL2OAOWMCgGgz84uBEDKDFIG8ORLhzLPO2Y5kK6PpMdJiBsR28nQkMOBEMJtTixISY4JUTZWPCgVXevesgCINhGG7dZPLEIg7GRRsMTsaoMTEOnmLUuBgn+e//JuTHGt0aKT3y3QIFpj6vO9ctnbnAmr9PIysefn0E0PfhkjW92HFtnQHULn5AAG9aISZGF3NaQYxVrInRrcVYBW4H5vkPEPIfuIV5UGXhClHT8Qv9oXQ/MckoTfb+wVTGqK8ZUl9+4mmUnpGj03pOmzlH5y/w5w6ZiAil+G9qA0KpkfWMTxKsJ6530wel3try9CwjSscg27BTDcw321gHjzyuEjj9IbwP1hPeDqHo2abP0pn5XMR/NhTB/fyo2gv3q0gh1JSkEHCrUuMSG1VxCdxDOtfR1ZDr4AGUwIUACi5JJZMyx1RHUgY3kIn0LBuFQk2EFlv7J3t0+id7JPi86wlJsfm9FUVbQrZR1LrPmQ0hKZfSXC7Fzr5LeD7uGoYBQBCGV56PS2g5ewGy+NkUNbjr9gAAAABJRU5ErkJggg==)
    0 0 no-repeat;
  background-size: contain;
}

.m-song-plybtn:after {
  content: "";
  display: block;
  position: absolute;
}

.m-song-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: url(@/assets/disc.png) no-repeat;
  background-size: contain;
}

@keyframes animateRotate {
  to {
    transform: rotate(360deg);
  }
}

.stop {
  animation-play-state: paused;
}
</style>
