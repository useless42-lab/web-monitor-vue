export default [{
    path: 'server',
    name: 'Server',
    component: () => import( /* webpackChunkName:"ServerList" */ '../views/user/server.vue'),
    children: [{
        path: 'list',
        component: () => import( /* webpackChunkName:"WebList" */ '../views/server/list.vue')
    }, {
        path: ':serverId',
        component: () => import( /* webpackChunkName:"Container" */ '../views/server/container.vue'),
        children: [{
            path: "overview",
            component: () => import( /* webpackChunkName:"WebOverview" */ '../views/server/overview.vue')
        }]
    }]
}, ]