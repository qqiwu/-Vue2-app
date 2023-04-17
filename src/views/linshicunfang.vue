<template>
  <div>
    <h2>我喜欢的音乐</h2>
    <ul>
      <li v-for="song in songs" :key="song.id">
        {{ song.name }} - {{ song.artist }}
      </li>
    </ul>
  </div>
</template>
<script>
import { likeSongs, getSongDetail } from "@/api";

export default {
  data() {
    return {
      songs: [],
    };
  },
  mounted() {
    this.fetchLikedSongs();
  },
  methods: {
    fetchLikedSongs() {
      const accountValue = localStorage.getItem("account"); // 从local storage 中获取account键的值
      const accountObj = JSON.parse(accountValue); // 将JSON字符串解析为JavaScript对象
      const uid = accountObj.id; // 获取id值
      console.log(uid);
      const cookie = localStorage.getItem("cookie");
      console.log(cookie);

      if (!uid || !cookie) {
        console.error("找不到uid或cookie");
        return;
      }

      likeSongs(`uid=${uid}`).then((res) => {
        console.log(res.data.ids);

        const ids = res.data.ids.join(",");
        console.log(ids);

        getSongDetail(ids).then((detailRes) => {
          console.log(detailRes);
          this.songs = detailRes.data.songs.map((song) => ({
            id: song.id,
            name: song.name,
            artist: song.ar[0].name,
          }));
          console.log(this.songs);
        });
      });
    },
  },
};
</script>
