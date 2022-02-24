export default [{
    path: 'minecraft',
    name: "minecraft",
    component: () => import( /* webpackChunkName:"ServerList" */ '../views/user/minecraft.vue'),
    children: [{
        path: 'list',
        component: () => import( /* webpackChunkName:"ApiList" */ '../views/minecraft/list.vue')
    }]
}]