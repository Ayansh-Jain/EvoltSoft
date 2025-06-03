import { createRouter, createWebHistory } from 'vue-router';
import Auth from './pages/Auth.vue';
import Stations from './pages/Stations.vue';

const routes = [
  { path: '/login', component: Auth },
  { path: '/signup', component: Auth },
  { path: '/', component: Stations, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
