import axios from 'axios';
import { SYSTEM } from '../utils/constant'

let prefix = SYSTEM.PREFIX_API_URL
const instance = axios.create({
    baseURL: SYSTEM.BASE_URL,
	method: 'get',
	timeout: SYSTEM.TIMEOUT,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
	}
})

//请求拦截
instance.interceptors.request.use(
    function (config) {
        config.url = prefix + config.url;
        if(config.method !== 'post') {
            config.params = config.data;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
)

// 响应拦截
instance.interceptors.response.use(
    function(response) {
        // TODO: 根据业务需求自行封装
        return response.data;
        // if(response.data.flag) {
           
        // } else if(!response.data.flag) {
        //     // window.location.href = '/';
        //     // return response.data;
        // } else {
        //     return Promise.reject(new Error(response.data));
        // }
    },
    function(error) {
        return Promise.reject(error);
    }
)

class Http {
    static install(Vue) {
        Vue.prototype.$http = Http.ajax;
    }

    static ajax(request) {
        return new Promise((res, rej) => {
            instance.request(request)
                .then(data => {
                    res(data);
                }, err => {
                    rej(err);
                })
        })
        
    }
}

export default Http;