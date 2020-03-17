import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
    mode:'history',
    routes:[
        {
            path:'/index',
            name:'index',
            component:()=>import("./components/views/index.vue"),
            children:[
                {
                    path:'home',
                    name:'home',
                    component:()=>import("./components/views/home.vue")
                },{
                    path:'infoshow',
                    name:'infoshow',
                    component:()=>import("./components/views/infoshow.vue")
                },
                {
                    path:'fundlist',
                    name:'fundlist',
                    component:()=>import("./components/views/fundlist.vue")
                }

            ]
        },
        {
            path:'/',
            name:'register',
            component:()=>import("./components/views/Register.vue")
        },
        {
            path:'/login',
            component:()=>import("./components/views/login.vue")
        },
        {
            path:'*',
            component:()=>import("./components/views/404.vue")
        }


    ]
})
//路由守卫
// router.beforeEach((to,from,next)=>{
//     const isLogin = localStorage.eleToken ? true:false
//      if(to.path=="/login"||to.path=="/"){
//          next();
//      }else{
//          isLogin?next():next('/login')
//      }
// })
export default router;