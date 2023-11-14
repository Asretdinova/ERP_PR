import axios from 'axios';
// import { Message } from 'element-ui'
// import VueNotifications from 'vue-notifications';
import store from '../store/index'
import { getToken, removeToken, setValues } from './auth'

// create an axios instance
const service = axios.create({
    // baseURL: 'http://localhost:8000', // api base_url
    // baseURL: '/', // production base_url
    baseURL: 'https://pr.uzedu.uz:8000', // api base_url
    // baseURL: 'https://pruzeduuz.itsm.uz/', // api base_url
    timeout: 100000 // request timeout
})


// request interceptor
service.interceptors.request.use(config => {
    // Do something before request is sent
    if (store.getters.token) {
        // config.headers['X-Token'] = getToken() // Let each request carry token--['X-Token'] as a custom key. Please modify it according to the actual situation.
        config.headers['Authorization'] = 'Bearer ' + getToken() // Let each request carry token--['X-Token'] as a custom key. Please modify it according to the actual situation.
    }
    return config
}, error => {
    // Do something with request error
    // console.log(error) // for debug
    if (error.response.data.code === "token_not_valid")  {
        removeToken()
        setValues('user', '[]')
        // this.$router.push({path: '/'})
    }
    if (error.response.status >= 500) {
        error.response.data.message = 'Server Error'
    }

   return  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    response => response,
    error => {
      if (error.response.data.code === "token_not_valid") {
        removeToken()
        setValues('user', '[]')
        // this.$router.push({path: '/'})
      }
        if (error.response.status >= 500) {
            error.response.data.message = 'Server Error'
        }
        return Promise.reject(error)
    })

export default service
