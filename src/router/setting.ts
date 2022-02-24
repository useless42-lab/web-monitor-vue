export default [{
    path: 'setting',
    name: 'Setting',
    component: () => import( /* webpackChunkName:"ServerList" */ '../views/user/setting.vue'),
    children: [{
        path: 'overview',
        component: () => import( /* webpackChunkName:"WebList" */ '../views/setting/index.vue')
    }]
}, ]