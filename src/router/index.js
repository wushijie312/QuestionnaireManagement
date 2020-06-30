import Vue from 'vue'
import Router from 'vue-router'
import storage, { TOKEN_KEY }from '../public/js/storage.js'

// 异步加载
const Welcome = () => import('@/components/Welcome')
const Home = () => import('@/components/Home')
const Register = () => import('@/components/Register')
const List = () => import('@/components/List')
const Data = () => import('@/components/Data')
const Edit = () => import('@/components/edit/Edit')
const Login = () => import('@/components/Login')
const Draw = () => import('@/components/Draw')
const Fill = () => import('@/components/fill/Fill')
const Success = () => import('@/components/success/Success')

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/lists/list', 
  },
  {
    path: '/',
    component: Home,
    meta:{name:'问卷管理'},
    children:[
      {
        path: '/lists/list',
        component: List,
        
        meta: {name:'问卷列表', requiresAuth: true }
      },
      {
        path: '/lists/welcome',
        component: Welcome,
        meta: {name:'问卷调查', requiresAuth: true }
      },
      
      {
        path: '/lists/data',
        name: 'data',
        component: Data,
        meta: {name:'查看数据', requiresAuth: true }
      },
      {
        path: '/lists/edit',
        alias: ['/lists/add', '/lists/re-edit'],
        name: 'edit',
        component: Edit,
        meta: {name:'添加数据', requiresAuth: true }
      }
    ]
  },{
    path: '/draws',
    component: Home,
    meta:{name:'画图工具'},
    children:[
      {
        path: 'draw',
        component: Draw,
        
        meta: {name:'画图', requiresAuth: true }
      }
    ]
  },
  
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/lists/fill',
    alias: '/lists/view',
    meta:{name:'分享问卷'},
    component: Fill
  },
  {
    path: '/lists/success',
    meta:{name:'提交成功'},
    component: Success
  },
]

const router = new Router({
  mode: 'hash',  
  routes })
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!storage.get(TOKEN_KEY)) {
//       next({
//         path: '/',
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router