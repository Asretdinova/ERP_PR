import request from '../utils/request'

export function postSignIn(data) {
    return request({
        url: '/api/token/',
        method: 'post',
        data
    })
}

export function getUsersList(data) {
    return request({
        url: '/api/profiles/',
        method: 'get',
        params: data
    })
}

export function putUsersEdit(data, id) {
    return request({
        url: '/api/profiles/'+id +'/',
        method: 'put',
        data
    })
}

export function postUser(data, role) {
    return request({
        url: '/api/'+ role + '/',
        method: 'post',
        data
    })
}

export function getUser(data, role) {
    return request({
        url: '/api/'+ role + '/',
        method: 'get',
        data
    })
}

export function getAccount() {
    return request({
        url: '/api/account/',
        method: 'get'
    })
}
export function deleteUser(id) {
    return request({
        url: '/api/profiles/'+id +'/',
        method: 'delete'
    })
}
