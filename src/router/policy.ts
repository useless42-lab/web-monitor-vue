export default [{
    path: 'policy',
    name: "Policy",
    component: () => import( /* webpackChunkName:"ServerList" */ '../views/user/policy.vue'),
    children: [{
        path: 'list',
        component: () => import( /* webpackChunkName:"ApiList" */ '../views/policy/list.vue')
    }]
}]