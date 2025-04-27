import { createWebHistory, createRouter } from 'vue-router';
import useStore from '@/composables/use-store';
import NotFound from '@/ui/pages/NotFound.vue';
import Products from '@/app/products/pages/Products.vue';
import Login from '@/app/auth/pages/Login.vue';
import { storeToRefs } from 'pinia';
import { PagesLinks } from './types';
import Categories from '@/app/categories/pages/Categories.vue';

const routes = [
  { path: PagesLinks.home, component: Login, meta: { public: true } },
  {
    path: PagesLinks.inventory,
    component: Products,
  },
  {
    path: PagesLinks.categories,
    component: Categories,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  if (to.meta.public === true) return next();

  const { isAuthenticated } = storeToRefs(useStore('auth'));

  if (!isAuthenticated.value) {
    return next('/');
  }

  return next();
});

export default router;
