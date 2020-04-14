import Vue from 'vue'
import vueRouter from 'vue-router'
import store from '../store'
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
const Dept = () => import('../views/system/department/DeptManage.vue')
const Menu = () => import('../views/system/user/Menu.vue')
const ChangePwd = () => import('../views/system/user/ChangePwd.vue')

const routes = [
    {path: '/', name: '/login', component: Login},
    {path: '/login', name: 'login', component: Login},
    {path: '/nav', name: 'nav', component: Nav,
        children: [
            {path: 'system/userManage', name: 'userManage', component: UserManage},
            {path: 'system/role', name: 'role', component: Role},
            {path: 'system/auth', name: 'auth', component: Auth},
            {path: 'system/menu', name: 'auth', component: Menu},
            {path: 'system/dept', name: 'dept', component: Dept},
            {path: 'system/changePwd', name: 'auth', component: ChangePwd},

            {path: 'dataCenter/summary', name: 'auth', component: Auth},
            {path: 'dataCenter/wsReport', name: 'auth', component: Auth},

            {path: 'wsManage/summaryCreate', name: 'auth', component: Auth},
            {path: 'wsManage/wsCreate', name: 'auth', component: Auth},
            {path: 'wsManage/wsQuery', name: 'auth', component: Auth},
            {path: 'wsManage/wsDispatch', name: 'auth', component: Auth},
            {path: 'wsManage/wsHandle', name: 'auth', component: Auth},

            {path: 'queryInfo/queryAll', name: 'auth', component: Auth},
            {path: 'queryInfo/expressInfo', name: 'auth', component: Auth},



            
            




            // {path: 'dataCenter', children: [{
            //     path: 'summary'
            // }, {
            //     path: 'wsReport'
            // }]},
            // {
            //     path: 'wsManage',
            //     children: [{
            //         path: 'summaryCreate'
            //     }, {
            //         path: 'wsCreate'
            //     }, {
            //         path: 'wsQuery'
            //     }, {
            //         path: 'wsDispatch'
            //     }, {
            //         path: 'wsHandle'
            //     },]
            // },
            // {
            //     path: 'system',
            //     children: [{
            //         path: 'userManage',
            //         component: UserManage,
            //         meta: {
            //             linkUrl: 'userM'
            //         }
            //     }, {
            //         path: 'role'
            //     }, {
            //         path: 'auth'
            //     }, {
            //         path: 'menu'
            //     }, {
            //         path: 'dept'
            //     }, {
            //         path: 'changepwd'
            //     }]
            // }, 
            // {
            //     path: 'queryInfo',
            //     children: [
            //         {
            //             path: 'queryAll'
            //         },{
            //             path: 'expressInfo'
            //         }
            //     ]
            // }
        ]
    },
    {path: '/*', redirect: '/login'}
]

const router = new vueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    // console.log('to===', to)
    // let authMenu = store.state.menu.menu;
    // if(authMenu.includes(to.path)) {
    //     next()
    // } else {
    //     next('/login')
    // }
    next()
})

export default router