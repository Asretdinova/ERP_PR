import request from '../utils/request'

export function getAdministration(data) {
    return request({
        url: '/api/administration/mno/',
        method: 'get',
        params: data
    })
}
export function getAdministrationId(id) {
    return request({
        url: '/api/administration/mno/'+id+'/',
        method: 'get',
    })
}

export function postAdministration(data) {
    return request({
        url: '/api/administration/mno/',
        method: 'post',
        data
    })
}

export function putAdministration(data, id) {
    return request({
        url: '/api/administration/mno/'+id +'/',
        method: 'put',
        data
    })
}

export function deleteAdministration(id) {
    return request({
        url: '/api/administration/mno/'+id +'/',
        method: 'delete'
    })
}
