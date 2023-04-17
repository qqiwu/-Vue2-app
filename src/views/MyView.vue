<template>
  <div class="myview">
    <!-- 头部 -->
    <van-nav-bar>
      <template #left>
        <div @click="showPopup">
          <van-icon name="wap-nav" size="20" />
        </div>
      </template>
      <template #right>
        <van-icon name="search" size="20" />
      </template>
    </van-nav-bar>
    <!--第一个栏-->
    <div class="user_msg">
      <template v-if="Object.keys(userInfo).length === 0">
        <van-icon :name="require('@/assets/my/index.jpg')" size="70"></van-icon>
        <van-button round to="/login"> 立即登录 </van-button>
      </template>
      <template v-if="Object.keys(userInfo).length != 0">
        <van-image round width="70px" height="70px" :src="userData.avatarUrl" />
        <div class="username">{{ userData.nickname }}</div>
        <div class="info">
          <span>{{ userInfo.profile.follows }}关注</span>
          <span>{{ userInfo.profile.followeds }}粉丝</span>
          <span>Lv{{ userInfo.level }}</span>
        </div>
      </template>
    </div>
    <!--第二个栏-->
    <van-grid :column-num="4">
      <van-grid-item
        v-for="(item, index) in 8"
        :key="index"
        :icon="icons[index].icon"
        :text="icons[index].title"
        @click="$router.push(icons[index].route)"
      />
    </van-grid>
    <!--第三个栏-->
    <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <van-image
          src="https://p1.music.126.net/em_fXgUJDApoV_3_8HYkNg==/109951164362973668.jpg"
          width="70px"
          radius="10px"
        />
      </van-grid-item>
      <van-grid-item>
        <span @click="$router.push('/like')" class="lovemusic"
          >我喜欢的音乐</span
        ></van-grid-item
      >
      <van-grid-item>
        <div class="love">
          <van-icon :name="require('@/assets/my/love.png')" />
          <span class="lovemusic">心动模式</span>
        </div>
      </van-grid-item>
    </van-grid>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

// import { Toast } from "vant";
import { getUserDetail } from "@/api";

export default {
  name: "my-view",
  data() {
    return {
      userData: {}, // 头像和昵称
      userInfo: {},
      show: false,
      isVip: false, // 增加一个isVip的数据属性
      qrimg: "",
      icons: [
        {
          icon: require("@/assets/my/play.png"),
          title: "最近播放",
          route: "recently",
        },
        {
          icon: require("@/assets/my/local.png"),
          title: "本地/下载",
        },
        {
          icon: require("@/assets/my/CloudDisk.png"),
          title: "云盘",
        },
        {
          icon: require("@/assets/my/Purchased.png"),
          title: "已购",
        },
        {
          icon: require("@/assets/my/friend.png"),
          title: "我的好友",
        },
        {
          icon: require("@/assets/my/collect.png"),
          title: "收藏和赞",
        },
        {
          icon: require("@/assets/my/dby.png"),
          title: "我的播客",
        },
        {
          icon: require("@/assets/my/yue.png"),
          title: "乐迷团",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getMsg"]),
    ...mapState(["msg"]),
  },
  components: {},
  created() {
    this.getUserInfo();
  },
  mounted() {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const parseData = JSON.parse(storedData);
      this.userData = parseData || {};
      console.log(this.userData);
    }
  },
  methods: {
    showPopup() {
      this.$bus.$emit("showPopup");
    },
    getUserInfo() {
      const accountValue = localStorage.getItem("account"); // 从local storage 中获取account键的值
      const accountObj = JSON.parse(accountValue); // 将JSON字符串解析为JavaScript对象
      const uid = accountObj.id; // 获取id值
      console.log(uid);
      getUserDetail(uid)
        .then((res) => {
          this.userInfo = res.data;
          this.isVip =
            this.userInfo.profile.vipType === 10 ||
            this.userInfo.profile.vipType === 11; // 判断用户是否开通会员
          console.log(this.isVip);
          localStorage.setItem("UserDetail", JSON.stringify(this.userInfo));
          console.log(this.userInfo);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
:deep(.van-popup) {
  background-color: transparent;
}
:deep(.van-button--default) {
  background-color: #e6e6e6;
}
.myview {
  background-color: #f6f6f6;
}
:deep(.van-nav-bar) {
  background-color: #f6f6f6;
}
.user_msg {
  /*width: 100%;*/
  background-color: #e6e6e6;
  position: relative;
  box-sizing: border-box;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info {
  display: inline-block;
  text-align: center;
  margin-top: 10px;
}

.info span {
  display: inline-block;
  margin-left: 10px;
}

.van-grid {
  padding: 15px;
}
.lovemusic {
  font-size: 14px;
  margin-right: 15px;
}
.love {
  display: flex;
  border-radius: 50px;
  border: 1px solid #f1f1f1;
}
</style>
