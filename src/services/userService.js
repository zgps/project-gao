import $http from '../http/index'

export default {
    login: (obj = {}) => {
        return $http.ajax({
            url: '/login',
            method: 'post',
            data: {
                name: obj.username,
                password: obj.password
            }
        })
    },
    // table删除
    handDelete: (obj = {})=> {
        return $http.ajax({
            url: '/user/findById',
            method:'get',
            data:{
                id:obj.id
                
            }
        })
    },

    // table编辑
    handAdd:(obj = {}) => {
        return $http.ajax({
            url: '/user/add',
            method:'post',
            data:obj
        })
    },
    // table编辑
    handEdit:(obj = {}) => {
        return $http.ajax({
            url: '/user/edit',
            method:'post',
            data:obj
        })
    },

    // 获取部门
    getDept:(obj = {}) => {
        return $http.ajax({
            url: '/dept/treeSelect',
            method:'get',
            data:{
                // id:obj.id
                
            }
        })
    },
    // 分页
    findPage:(obj = {}) => {
        return $http.ajax({
            url: '/user/findPage',
            method:'post',
            data:obj
        })
    },


    

    //获取导航菜单
    getAuthName:(obj = {}) => {
        return $http.ajax({
            url: '/user/getUserName',
            method:'get',
            // data:obj
        })
    },
    getMenuList:(obj = {}) => {
        return $http.ajax({
            url: '/menu/getMenuList',
            method:'get',
            data:{
                username:obj
            }
        })
    },



}