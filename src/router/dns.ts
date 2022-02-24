export default [{
    path: 'dns',
    name: "dns",
    component: () => import( /* webpackChunkName:"ServerList" */ '../views/user/dns.vue'),
    children: [{
        path: 'list',
        component: () => import( /* webpackChunkName:"ApiList" */ '../views/dns/list.vue')
    }]
}]