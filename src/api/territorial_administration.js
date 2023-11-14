import request from '../utils/request'

export function getAdministration(data) {
    return request({
        url: '/api/administration/ter/',
        method: 'get',
        params: data
    })
}
export function getAdministrationId(id) {
    return request({
        url: '/api/administration/ter/'+id+'/',
        method: 'get',
    })
}

export function postAdministration(data) {
    return request({
        url: '/api/administration/ter/',
        method: 'post',
        data
    })
}

export function putAdministration(data, id) {
    return request({
        url: '/api/administration/ter/'+id +'/',
        method: 'put',
        data
    })
}

export function deleteAdministration(id) {
    return request({
        url: '/api/administration/ter/'+id +'/',
        method: 'delete'
    })
}
