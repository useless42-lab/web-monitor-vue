export default [{
    path: 'api',
    name: 'Api',
    component: () => import( /* webpackChunkName:"ServerList" */ '../views/user/api.vue'),
    children: [{
            path: 'list',
            component: () => import( /* webpackChunkName:"ApiList" */ '../views/api/list.vue')
        },
        {
            path: 'create',
            component: () => import( /* webpackChunkName:"CreateApi" */ '../views/api/create.vue')
        }
    ]
}, ]