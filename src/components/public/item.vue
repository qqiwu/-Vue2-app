<template>
  <div class="public-item-com">
    <div class="border">
      <van-image radius="5px" fit="cover" :width="width" :src="url" />
    </div>
    <div class="count">
      <van-icon name="play-circle" color="#fff" />
      {{ count | formatCount }}
    </div>
  </div>
</template>

<script>
export default {
  name: "public-item-com",
  data() {
    return {};
  },
  props: {
    url: {
      default: "",
      type: String,
    },
    count: {
      default: 0,
      type: Number,
    },
    width: {
      default: "abc",
      type: String,
    },
  },
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {},
  filters: {
    formatCount(value) {
      if (value >= 10 ** 8) {
        return `${(value / 10 ** 8).toFixed(1)}亿`;
      }
      if (value >= 10 ** 4) {
        return `${(value / 10 ** 4).toFixed(0)}万`;
      }
      return value;
    },
  },
};
</script>
<style scoped>
.public-item-com {
  position: relative;
}
.count {
  position: absolute;
  right: 5px;
  top: 5px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  text-shadow: 0px 0px 2px #000;
}
.border {
  box-shadow: 0px 0px 2px #000;
  border-radius: 5px;
}
</style>
