<template>
  <div class="cdBox" @click="$emit('click')">
    <!-- cd -->
    <div class="m-song-disc">
      <div class="m-song-turn">
        <div class="m-song-rollwrap">
          <div class="m-song-img">
            <img
              class="u-img"
              alt="song-img"
              src="http://p2.music.126.net/A31JnkenHKF0dcNPSDpapA==/109951165390888332.jpg?imageView&amp;thumbnail=360y360&amp;quality=75&amp;tostatic=0"
            />
          </div>
        </div>
        <div class="m-song-lgour">
          <div class="m-song-light"></div>
        </div>
      </div>
      <span class="m-song-plybtn"></span>
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
</template>

<script>
export default {
  name: "cd",
  data() {
    return {};
  },
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style></style>
