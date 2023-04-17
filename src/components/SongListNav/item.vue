<template>
  <div
    class="list-item"
    v-if="playlist.id"
    @click="$router.push({ name: 'song-list', params: { id: playlist.id } })"
  >
    <public-item
      :width="'120px'"
      :url="playlist.picUrl || playlist.coverImgUrl"
      :count="playlist.playCount"
    ></public-item>
    <div class="item-footer">
      {{ playlist.name || playlist.description }}
    </div>
  </div>
</template>

<script>
import publicItem from "../public/item.vue";

export default {
  name: "list-item",
  data() {
    return {};
  },
  computed: {},
  components: {
    publicItem,
  },
  props: {
    playlist: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.list-item {
  margin: 5px 0px;
  margin-right: 8px;
}
.item-footer {
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 1px;
  margin-top: 5px;
  height: 36px;
  overflow: hidden;
}
</style>
