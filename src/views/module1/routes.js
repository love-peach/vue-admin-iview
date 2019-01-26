const About1 = () => import(/* webpackChunkName: "M1About1" */ '@/views/module1/about1/index.vue');
const About2 = () => import(/* webpackChunkName: "M1About2" */ '@/views/module1/about2/index.vue');

export default [
  {
    path: '/module1/about1',
    name: 'M1About1',
    component: About1,
  },
  {
    path: '/module1/about2',
    name: 'M1About2',
    component: About2,
  },
];
