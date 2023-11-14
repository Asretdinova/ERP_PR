import request from '../utils/request'

export function getCallCenter(data) {
    return request({
        url: '/api/applications/',
        method: 'get',
        params: data
    })
}
export function getCallCenterId(id) {
    return request({
        url: '/api/applications/'+id+'/',
        method: 'get',
    })
}

export function postCallCenter(data) {
    return request({
        url: '/api/applications/',
        method: 'post',
        data
    })
}


export function putCallCenter(data, id) {
    return request({
        url: '/api/applications/' + id + '/',
        method: 'put',
        data
    })
}


export function deleteCallCenter(id) {
    return request({
        url: '/api/applications/'+id+'/',
        method: 'delete',
    })
}
