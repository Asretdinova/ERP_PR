import request from '../utils/request'

export function getAdministration(data) {
    return request({
        url: '/api/administration/res/',
        method: 'get',
        params: data
    })
}
export function getAdministrationId(id) {
    return request({
        url: '/api/administration/res/'+id+'/',
        method: 'get',
    })
}

export function postAdministration(data) {
    return request({
        url: '/api/administration/res/',
        method: 'post',
        data
    })
}

export function putAdministration(data, id) {
    return request({
        url: '/api/administration/res/'+id +'/',
        method: 'put',
        data
    })
}

export function deleteAdministration(id) {
    return request({
        url: '/api/administration/res/'+id +'/',
        method: 'delete'
    })
}
