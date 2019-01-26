const About1 = () => import(/* webpackChunkName: "M2About1" */ '@/views/module2/about1/index.vue');
const About2 = () => import(/* webpackChunkName: "M2About2" */ '@/views/module2/about2/index.vue');

export default [
  {
    path: '/module2/about1',
    name: 'M2About1',
    component: About1,
  },
  {
    path: '/module2/about2',
    name: 'M2About2',
    component: About2,
  },
];
