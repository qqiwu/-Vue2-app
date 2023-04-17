<template>
  <div class="aside">
    <!--顶部信息-->
    <div class="sidebar">
      <template v-if="Object.keys(userData).length === 0">
        <van-row class="center">
          <van-col span="4">
            <van-image
              width="38"
              height="38"
              round
              :src="require('@/assets/aside/index.jpg')"
            />
          </van-col>
          <van-col span="20">
            立即登录
            <van-icon name="arrow" />
          </van-col>
          <van-col span="2">
            <van-icon name="scan" size="20" />
          </van-col>
        </van-row>
      </template>
      <template v-else>
        <van-row class="center">
          <van-col span="4">
            <van-image width="38" height="38" round :src="userData.avatarUrl" />
          </van-col>
          <van-col span="20">
            {{ userData.nickname }}
            <van-icon name="arrow" />
          </van-col>
          <van-col span="2">
            <van-icon name="scan" size="20" />
          </van-col>
        </van-row>
      </template>
    </div>
    <!--会员信息-->
    <div class="member">
      <!--第一条-->
      <van-row class="center">
        <van-col span="18">黑胶VIP·陆</van-col>
        <van-col span="10">
          <van-button round>会员中心</van-button>
        </van-col>
      </van-row>
      <!--第二条-->
      <van-row class="growthValue">
        <van-col span="24">
          有11成长值待领取
          <van-icon name="arrow" />
        </van-col>
      </van-row>
      <!--第三条-->
      <van-row>
        <van-col span="26">点击升级SVIP,尽享尊贵千元特权</van-col>
      </van-row>
    </div>
    <!--功能区1-->
    <van-cell-group inset>
      <van-cell title="我的消息" is-link />
      <van-cell title="云贝中心" is-link value="签到" />
      <van-cell title="创作者中心" is-link />
    </van-cell-group>
    <!--功能区2-->
    <van-cell-group inset>
      <van-cell class="title" title="音乐服务" />
      <van-cell title="云贝中心" is-link value="趣测" />
      <van-cell title="云村有票" is-link />
      <van-cell title="多多西西口袋" is-link />
      <van-cell title="商城" is-link value="百亿补贴" />
      <van-cell title="Beat专区" is-link value="Beat爆红歌曲" />
      <van-cell title="口袋彩铃" is-link />
      <van-cell title="游戏专区" is-link value="音乐浇灌治愈" />
    </van-cell-group>
    <!--功能区3-->
    <van-cell-group inset>
      <van-cell class="title" title="其他" />
      <van-cell title="设置" is-link />
      <van-cell title="深色模式">
        <template #extra>
          <van-switch v-model="checked" size="24px" inactive-color="#cecece" />
        </template>
      </van-cell>
      <van-cell title="定时关闭" is-link />
      <van-cell title="个性装扮" is-link />
      <van-cell title="边听边存" is-link value="未开启" />
      <van-cell title="在线听歌免流量" is-link />
      <van-cell title="音乐黑名单" is-link />
      <van-cell title="青少年模式" is-link value="未开启" />
      <van-cell title="音乐闹钟" is-link />
    </van-cell-group>
    <!--功能区4-->
    <van-cell-group inset>
      <van-cell title="我的订单" is-link />
      <van-cell title="优惠券" is-link />
      <van-cell title="我的客服" is-link />
      <van-cell title="分享网易云音乐" is-link />
      <van-cell title="个人信息手机与使用清单" is-link />
      <van-cell title="个人信息第三方共享清单" is-link />
      <van-cell title="个人信息与隐私保护" is-link />
      <van-cell title="关于" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      userData: {}, // 头像和昵称
    };
  },
  computed: {},
  components: {},
  created() {},
  mounted() {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const parseData = JSON.parse(storedData);
      this.userData = parseData || {};
      console.log(this.userData);
    }
  },
  methods: {},
};
</script>
<style scoped>
/*顶部信息*/
.sidebar {
  font-size: 16px;
  padding: 10px;
  position: sticky;
  top: 0;
  z-index: 9999;
}
.center {
  display: flex;
  align-items: center;
  font-size: 16px;
}
/*会员信息*/
.member {
  margin: 30px auto;
  padding: 10px;
  border-radius: 10px;
  background: linear-gradient(70deg, rgb(59, 55, 56), rgb(95, 79, 80));
}
.growthValue {
  font-size: 14px;
  color: #a39293;
}
:deep(.van-col--18) {
  font-size: 20px;
  color: #f7e4de;
}
:deep(.van-button) {
  height: 32px;
}
:deep(.van-button--default) {
  background-color: transparent;
  color: #dbc5c7;
}
:deep(.van-col--26) {
  font-size: 14px;
  padding-top: 16px;
  color: #9b8b8c;
}
.van-cell-group--inset {
  padding: 8px;
}
.van-cell-group--inset > div {
  background-color: #f6f6f6;
}
.title {
  color: #939393;
}
</style>
