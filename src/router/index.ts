import { createWebHistory, createRouter } from 'vue-router';
import useStore from '@/composables/use-store';
import NotFound from '@/ui/pages/NotFound.vue';
import Products from '@/app/products/Products.vue';
import Login from '@/app/auth/pages/Login.vue';

const routes = [
  { path: '/', name: 'RootNotFound', component: NotFound },
  {
    path: '/:slugName',
    name: 'LoginWithSlug',
    component: Login,
  },
  {
    path: '/:slugName/dashboard',
    name: 'Dashboard',
    component: Products,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'CatchAllNotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const { accessToken } = useStore('auth');

  const isAuthenticated = !!accessToken;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/');
  }

  return next();
});

export default router;
