import AuthMain from '../views/auth/main.vue';
export default [{
    path:"/auth",
    component:AuthMain,
    children:[
        {
            path: 'login',
            name: 'Login',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component:()=>import(/* webpackChunkName:"AuthLogin" */ '../views/auth/login.vue')
          },
          {
            path: 'register',
            name: 'Register',
            component:()=>import(/* webpackChunkName:"AuthRegister" */ '../views/auth/register.vue')
          },
          {
            path: 'forget',
            name: 'Forget',
            component:()=>import(/* webpackChunkName:"AuthRegister" */ '../views/auth/forget.vue')
          },
          {
            path: 'reset',
            name: 'Reset',
            component:()=>import(/* webpackChunkName:"AuthRegister" */ '../views/auth/reset.vue')
          },
    ]
}]