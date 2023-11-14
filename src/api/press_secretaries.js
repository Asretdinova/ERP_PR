import request from '../utils/request'

export function getPressSecretaries(data) {
    return request({
        url: '/api/administration/press/',
        method: 'get',
        params: data
    })
}
export function getPressSecretariesId(id) {
    return request({
        url: '/api/administration/press/'+id+'/',
        method: 'get',
    })
}

export function postPressSecretaries(data) {
    return request({
        url: '/api/administration/press/',
        method: 'post',
        data
    })
}

export function putPressSecretaries(data, id) {
    return request({
        url: '/api/administration/press/'+id +'/',
        method: 'put',
        data
    })
}

export function deletePressSecretaries(id) {
    return request({
        url: '/api/administration/press/'+id +'/',
        method: 'delete'
    })
}
