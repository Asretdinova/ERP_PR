import request from '../utils/request'

export function getRegions(data) {
    return request({
        url: '/api/region/',
        method: 'get',
        params: data
    })
}
export function getRegionsId(id) {
    return request({
        url: '/api/region/'+id+'/',
        method: 'get',
    })
}

export function postRegions(data) {
    return request({
        url: '/api/region/',
        method: 'post',
        data
    })
}

export function putRegions(data, id) {
    return request({
        url: '/api/region/'+id +'/',
        method: 'put',
        data
    })
}

export function deleteRegions(id) {
    return request({
        url: '/api/region/'+id +'/',
        method: 'delete'
    })
}
