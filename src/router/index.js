import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('../layout/Layout.vue'),
    redirect: '/home',
    children:[
      {
        path: '/home',
        name: 'home',
        component: ()=>import("../views/HomeView.vue")
      },
      {
        path: '/teacher',
        name: 'teacher',
        component: () => import('../views/TeacherView.vue')
      },
      {
        path: '/customer',
        name: 'customer',
        component: () => import('../views/CustomerView.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('../views/CourseView.vue')
      },
      {
        path: '/chapter',
        name: 'chapter',
        component: () => import('../views/ChapterView.vue')
      }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
    let token = localStorage.getItem("token");
    if(token || to.path === "/login"){

      console.log("token值："+token)
      next();
    }else{
      next("/login");
    }
})

export default router
