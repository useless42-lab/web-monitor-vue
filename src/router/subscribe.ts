export default [{
    path: 'subscribe',
    name: "subscribe",
    component: () => import( /* webpackChunkName:"ServerList" */ '../views/user/subscribe.vue'),
    children: [{
        path: 'list',
        component: () => import( /* webpackChunkName:"ApiList" */ '../views/subscribe/list.vue')
    }]
}]