import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"), //路由懒加载
    redirect: "/discover",
    children: [
      {
        path: "my",
        name: "my",
        component: () => import("../views/MyView.vue"), //路由懒加载
      },
      {
        path: "discover",
        name: "discover",
        component: () => import("../views/DiscoverView.vue"), //路由懒加载
        // children: [
        //   {
        //     path: "recommend",
        //     name: "recommend",
        //     component: () => import("../views/RecommendView.vue"),
        //   },
        // ],
      },
      {
        path: "login",
        name: "login-view",
        component: () => import("../views/LoginView.vue"), //路由懒加载
      },
    ],
  },
  {
    path: "/songList/:id",
    name: "song-list",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SongListView.vue"), //路由懒加载
    props($route) {
      return {
        id: Number($route.params.id) || 0,
      };
    },
  },
  {
    path: "/play",
    name: "play",
    component: () => import("../views/PlayView.vue"), //路由懒加载
  },
  {
    path: "/search",
    name: "SearchView",
    component: () => import("../views/SearchView.vue"), //路由懒加载
  },
  {
    path: "/recommend",
    name: "RecommendView",
    component: () => import("../views/RecommendView.vue"),
  },
  {
    path: "/recently",
    name: "RecentlyPlayed",
    component: () => import("../views/RecentlyView.vue"), //路由懒加载
  },
  {
    path: "/like",
    name: "like",
    component: () => import("../views/LikeView.vue"), //路由懒加载
  },
];

const router = new VueRouter({
  routes,
});

export default router;
