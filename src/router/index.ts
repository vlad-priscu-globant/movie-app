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
    meta: { requiresAuth: true },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const token = localStorage.getItem('token')

  if (requiresAuth && !token) {
    return next('/login')
  }

  return next()
})