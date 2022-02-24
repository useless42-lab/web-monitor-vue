export default [{
    path: 'heartbeat',
    name: "heartbeat",
    component: () => import( /* webpackChunkName:"ServerList" */ '../views/user/heartbeat.vue'),
    children: [{
        path: 'list',
        component: () => import( /* webpackChunkName:"ApiList" */ '../views/heartbeat/list.vue')
    }]
}]