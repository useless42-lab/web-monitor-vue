export default [{
    path: 'tcp',
    name: "tcp",
    component: () => import( /* webpackChunkName:"ServerList" */ '../views/user/tcp.vue'),
    children: [{
        path: 'list',
        component: () => import( /* webpackChunkName:"ApiList" */ '../views/tcp/list.vue')
    }]
}]