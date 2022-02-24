export default [{
    path: 'team',
    name: "Team",
    component: () => import( /* webpackChunkName:"ServerList" */ '../views/user/team.vue'),
    children: [{
        path: 'list',
        component: () => import( /* webpackChunkName:"ApiList" */ '../views/team/list.vue')
    },{
        path: 'detail',
        component: () => import( /* webpackChunkName:"ApiList" */ '../views/team/detail.vue')
    }]
}]