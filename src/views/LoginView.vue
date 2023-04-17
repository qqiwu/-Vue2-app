<template>
  <div class="myview">
    <div class="hello">
      <van-image
        width="60"
        height="60"
        :src="require('@/assets/my/wangyiyun.png')"
      />
    </div>
    <van-button @click="login" round>二维码登录</van-button>
    <van-popup v-model="show">
      <van-image
        width="260"
        height="260"
        radius="10"
        fit="cover"
        :src="qrimg"
      />
    </van-popup>
    <router-view></router-view>
  </div>
</template>

<script>
import { getQrKey, getQr, checkQr, getStatus } from "@/api";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "login-view",
  data() {
    return {
      show: false,
      qrimg: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    ...mapActions(["changeMsg", "toggleCookie", "toggleAccount"]),
    ...mapMutations(["CHANGEMSG"]),
    async login() {
      var { data } = await getQrKey();
      const key = data.data.unikey;
      // 根据key获取图片
      var { data } = await getQr(key);
      const { qrimg } = data.data;
      this.qrimg = qrimg;
      this.show = true;
      // 轮询
      // 定时器轮询
      const time = setInterval(async () => {
        // 接口请求验证对应的是否登录
        var { data } = await checkQr(key);
        // 验证状态
        console.log(data);
        if (data.code == 800) {
          // 过期了重新请求
          this.getQrCodeImg();
          clearInterval(time);
        } else if (data.code == 803) {
          // 登录成功
          // 得到对应的cookie存储起来
          this.toggleCookie(data.cookie);
          localStorage.setItem("cookie", data.cookie);
          var { data } = await getStatus(data.cookie);
          console.log(data);
          this.toggleAccount({
            account: data.data.account,
            profile: data.data.profile,
          });
          localStorage.setItem("account", JSON.stringify(data.data.account));
          localStorage.setItem("profile", JSON.stringify(data.data.profile));
          // 清除定时器
          clearInterval(time);
          this.show = false;
          this.$router.push({ path: "/my" });
        }
      }, 2000);
    },
    async getQrCodeImg() {
      var { data } = await getQrKey();
      const key = data.data.unikey;
      // 根据key获取图片
      var { data } = await getQr(key);
      const { qrimg } = data.data;
      this.qrimg = qrimg;
      return key;
    },
  },
};
</script>
<style scoped>
:deep(.van-popup) {
  background-color: transparent;
}
.hello {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 150px;
  background: linear-gradient(to bottom, #ffe7e7, #fefefe);
}
.van-button--default {
  color: white;
  background-color: #dd2d1e;
  width: 100%;
}
</style>
