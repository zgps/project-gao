import Vue from 'vue'
import vueRouter from 'vue-router'
const routerPush = vueRouter.prototype.push

//重写vueRouter解决点击相同导航问题
vueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(vueRouter)

const App = () => import('../App.vue')
const Login = () => import('../views/system/user/Login.vue')
const Nav = () => import('../views/Nav.vue')
const UserManage = () => import('../views/system/user/UserManage.vue')
const Role = () => import('../views/system/user/Role.vue')
const Auth = () => import('../views/system/user/Auth.vue')

const routes = [
    {path: '/', name: '/login', component: Login},
    {path: '/login', name: 'login', component: Login},
    {path: '/nav', name: 'nav', component: Nav,
        children: [
            {path: 'userManage', name: 'userManage', component: UserManage},
            {path: 'role', name: 'role', component: Role},
            {path: 'auth', name: 'auth', component: Auth},
        ]
    },
    {path: '/*', redirect: '/login'}
]

const router = new vueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    // next('/login')
    next()
})

export default router