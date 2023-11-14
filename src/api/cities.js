import request from '../utils/request'

export function getCities(data) {
    return request({
        url: '/api/city/',
        method: 'get',
        params: data
    })
}
export function getCitiesId(id) {
    return request({
        url: '/api/city/'+id+'/',
        method: 'get',
    })
}

export function postCities(data) {
    return request({
        url: '/api/city/',
        method: 'post',
        data
    })
}

export function putCities(data, id) {
    return request({
        url: '/api/city/'+id +'/',
        method: 'put',
        data
    })
}

export function deleteCities(id) {
    return request({
        url: '/api/city/'+id +'/',
        method: 'delete'
    })
}
