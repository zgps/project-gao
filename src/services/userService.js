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

    // table确定添加添加
    handAdd:(url,obj = {}) => {
        return $http.ajax({
            url: url,
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

    // 获取部门
    getMenu:(url,obj = {}) => {
        return $http.ajax({
            url: url,
            method:'get',
            data:{
                // id:obj.id
                
            }
        })
    },
    //获取权限
    getPomission:(url,obj = {}) => {
        return $http.ajax({
            url: url,
            method:'get',
            data:{
                // id:obj.id
                
            }
        })
    },
    //获取role
    getRole:(obj = {}) => {
        return $http.ajax({
            url: '/role/findAll',
            method:'get',
            data:{
                // id:obj.id
                
            }
        })
    },
    // 分页
    findPage:(url,obj = {}) => {
        return $http.ajax({
            url: url,
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
    getById:(url,obj = {}) => {
        return $http.ajax({
            url: url,
            method:'get',
            data:obj
        })
    },

    // 删除
    _delete:(url,obj = {}) => {
        return $http.ajax({
            url: url,
            method:'get',
            data:obj
        })
    },

    // 编辑
    _edit:(url,obj = {}) => {
        return $http.ajax({
            url:url,
            method:'get',
            data:obj
        })
    },

    _edit1:(url,obj = {}) => {
        return $http.ajax({
            url:url,
            method:'post',
            data:obj
        })
    },

    // 获取数据
    getList:(url,obj = {}) => {
        return $http.ajax({
            url:url,
            method:'get',
            data:obj
        })
    }



}