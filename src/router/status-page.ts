export default [{
    path: 'status-page',
    name: 'StatusPage',
    component: () => import( /* webpackChunkName:"ServerList" */ '../views/user/status-page.vue'),
    children: [{
        path: 'list',
        component: () => import( /* webpackChunkName:"WebList" */ '../views/status-page/list.vue')
    },]
}, ]