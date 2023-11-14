import request from '../utils/request'

export function getInterview(data) {
    return request({
        url: '/api/interviews/',
        method: 'get',
        params: data
    })
}
export function getInterviewId(id) {
    return request({
        url: '/api/interviews/'+id+'/',
        method: 'get',
    })
}

export function postInterview(data) {
    return request({
        url: '/api/interviews/',
        method: 'post',
        data
    })
}

export function putInterview(data, id) {
    return request({
        url: '/api/interviews/'+id +'/',
        method: 'put',
        data
    })
}

export function deleteInterview(id) {
    return request({
        url: '/api/interviews/'+id +'/',
        method: 'delete'
    })
}

export function postInterviewPhotos(data) {
    return request({
        url: '/api/interview-photos/',
        method: 'POST',
        data
    })
}

export function putInterviewPhotos(data, id) {
    return request({
        url: '/api/interview-photos/'+ id + '/',
        method: 'PUT',
        data
    })
}

export function deleteInterviewPhotos(id) {
    return request({
        url: '/api/interview-photos/'+id+'/',
        method: 'DELETE'
    })
}
