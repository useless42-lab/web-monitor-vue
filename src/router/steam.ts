export default [{
    path: 'steam',
    name: "steam",
    component: () => import( /* webpackChunkName:"ServerList" */ '../views/user/steam.vue'),
    children: [{
        path: 'list',
        component: () => import( /* webpackChunkName:"ApiList" */ '../views/steam/list.vue')
    }]
}]