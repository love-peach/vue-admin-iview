export const AppLayout = () => import(/* webpackChunkName: 'AppLayout' */ '@/components/framework/app-layout/');

export const Home = () => import(/* webpackChunkName: 'Home' */ '@/views/home');
export const Login = () => import(/* webpackChunkName: "Login" */ '@/views/login/index.vue');

export const Error404 = () => import(/* webpackChunkName: "Login" */ '@/views/error-page/404.vue');

export const M1About1 = () => import(/* webpackChunkName: 'M1About1' */ '@/views/module1/about1/index.vue');
export const M1About2 = () => import(/* webpackChunkName: 'M1About2' */ '@/views/module1/about2/index.vue');
export const M2About1 = () => import(/* webpackChunkName: 'M2About1' */ '@/views/module2/about1/index.vue');
export const M2About2 = () => import(/* webpackChunkName: 'M2About2' */ '@/views/module2/about2/index.vue');
