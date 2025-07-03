import MovieList from "../components/MovieList.vue";
import MovieDetail from "../components/MovieDetail.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MovieList,
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})