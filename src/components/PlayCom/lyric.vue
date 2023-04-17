<template>
  <div class="lyricBox" @click="$emit('click')">
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
    <scroll :scrollX="false" :scrollY="true" :height="400">
      <div class="lyricList">
        <div>网易与你皆是遗憾</div>
      </div>
    </scroll>
    <van-row>
      <van-col span="4">
        <van-row>
          <van-col span="12">
            <van-icon name="like-o" size="18"></van-icon>
          </van-col>
          <van-col span="12">
            <van-icon name="play-circle-o" size="18"></van-icon>
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
</template>

<script>
import Scroll from "@/components/public/scroll.vue";

export default {
  name: "lyric",
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
