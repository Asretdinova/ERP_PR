import request from '../utils/request'

export function getJournalists(data) {
    return request({
        url: '/api/journalists/',
        method: 'get',
        params: data
    })
}
export function getJournalistId(id) {
    return request({
        url: '/api/journalists/'+id+'/',
        method: 'get',
    })
}

export function postJournalists(data) {
    return request({
        url: '/api/journalists/',
        method: 'post',
        data
    })
}

export function putJournalists(data, id) {
    return request({
        url: '/api/journalists/'+id +'/',
        method: 'put',
        data
    })
}

export function deleteJournalists(id) {
    return request({
        url: '/api/journalists/'+id +'/',
        method: 'delete'
    })
}
