import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import JoinChat from '@/components/JoinChat.vue';
import HomeView from '../views/HomeView.vue';
import Gallery from '../components/Gallery.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  { path: '/gallery', component: Gallery },
  { path: '/chat', component: JoinChat },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
