import request from '../utils/request'

export function getMedia(data) {
    return request({
        url: '/api/media/',
        method: 'get',
        params: data
    })
}
export function getMediaId(id) {
    return request({
        url: '/api/media/'+id+'/',
        method: 'get',
    })
}

export function postMedia(data) {
    return request({
        url: '/api/media/',
        method: 'post',
        data
    })
}

export function putMedia(data, id) {
    return request({
        url: '/api/media/'+id +'/',
        method: 'put',
        data
    })
}

export function deleteMedia(id) {
    return request({
        url: '/api/media/'+id +'/',
        method: 'delete'
    })
}

export function getMediaType(data) {
    return request({
        url: '/api/media/types/',
        method: 'get',
        params: data
    })
}
