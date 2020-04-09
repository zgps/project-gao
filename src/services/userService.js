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
    handDelete: (obj = {})=> {
        return $http.ajax({
            url: '/user/findById',
            method:'get',
            data:{
                id:obj.id
                
            }
        })
    },
    getDept:(obj = {}) => {
        return $http.ajax({
            url: '/dept/treeSelect',
            method:'get',
            data:{
                // id:obj.id
                
            }
        })
    },
    findPage:(obj = {}) => {
        return $http.ajax({
            url: '/user/findPage',
            method:'post',
            data:obj
        })
    },



}