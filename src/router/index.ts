import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("../components/MovieList.vue"),
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: () => import("../components/MovieDetail.vue"),
    props: true,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})