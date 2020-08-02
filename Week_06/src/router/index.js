import Vue from 'vue';
import VueRouter from 'vue-router';
// import Layout from '../views/layout/Layout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/layout/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/layout/Home.vue'),
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/layout/About.vue'),
      },
      {
        path: '/products',
        component: () => import('../views/layout/Products.vue'),
      },
      {
        path: '/product/:id',
        component: () => import('../views/layout/Product.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
