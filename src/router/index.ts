import Vue from 'vue'
import VueRouter, {
  RouteConfig
} from 'vue-router'

import AuthRouter from './auth';
import UserRouter from './user';

Vue.use(VueRouter)

const routes: Array < RouteConfig > = [
  ...AuthRouter,
  ...UserRouter,
  {
    path: '/',
    name: 'Index',
    component: () => import( /* webpackChunkName:"WebOverview" */ '../views/index/index.vue')
  },
  {
    path: '/team/transfer',
    name: 'TeamTransfer',
    component: () => import( /* webpackChunkName:"WebOverview" */ '../views/team/transfer.vue')
  },
  {
    path: '/team/invite',
    name: 'TeamInvite',
    component: () => import( /* webpackChunkName:"WebOverview" */ '../views/team/invite.vue')
  },
  {
    path: '/status_page/:id',
    name: 'StatusPageDetail',
    component: () => import( /* webpackChunkName:"WebOverview" */ '../views/status-page/detail.vue')
  },
  {
    path: "*",
    redirect: "/auth/login"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router