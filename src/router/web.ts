export default [{
    path: 'web',
    name: 'Web',
    component: () => import( /* webpackChunkName:"Web" */ '../views/user/web.vue'),
    children: [{
        path: 'list',
        component: () => import( /* webpackChunkName:"WebList" */ '../views/web/list.vue')
    }, {
        path: ':webId',
        name: 'WebList',
        component: () => import( /* webpackChunkName:"Container" */ '../views/web/container.vue'),
        children: [{
                path: 'overview',
                component: () => import( /* webpackChunkName:"WebOverview" */ '../views/web/overview.vue')
            },
        ]
    }]
}, ]