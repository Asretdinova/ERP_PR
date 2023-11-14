import request from '../utils/request'

export function getMediaRequest(data) {
    return request({
        url: '/api/media_requests/',
        method: 'get',
        params: data
    })
}
export function getMediaRequestId(id) {
    return request({
        url: '/api/media_requests/'+id+'/',
        method: 'get',
    })
}

export function postMediaRequest(data) {
    return request({
        url: '/api/media_requests/',
        method: 'post',
        data
    })
}

export function putMediaRequest(data, id) {
    return request({
        url: '/api/media_requests/'+id +'/',
        method: 'put',
        data
    })
}

export function deleteMediaRequest(id) {
    return request({
        url: '/api/media_requests/'+id +'/',
        method: 'delete'
    })
}

export function getMediaType(data) {
    return request({
        url: '/api/media_requests/types/',
        method: 'get',
        params: data
    })
}
