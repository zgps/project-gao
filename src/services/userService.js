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
}