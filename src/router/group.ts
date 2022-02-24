export default [{
    path: 'group',
    name: "Group",
    component: () => import( /* webpackChunkName:"ServerList" */ '../views/user/group.vue'),
    children: [{
        path: 'list',
        component: () => import( /* webpackChunkName:"ApiList" */ '../views/group/list.vue')
    },{
        path: 'detail',
        component: () => import( /* webpackChunkName:"ApiList" */ '../views/group/detail.vue')
    }]
}]