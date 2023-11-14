import request from '../utils/request'

export function getArticles(data) {
    return request({
        url: '/api/articles/',
        method: 'get',
        params: data
    })
}
export function getArticlesId(id) {
    return request({
        url: '/api/articles/'+id+'/',
        method: 'get',
    })
}

export function postArticles(data) {
    return request({
        url: '/api/articles/',
        method: 'post',
        data
    })
}

export function putArticles(data, id) {
    return request({
        url: '/api/articles/'+id +'/',
        method: 'put',
        data
    })
}

export function deleteArticles(id) {
    return request({
        url: '/api/articles/'+id +'/',
        method: 'delete'
    })
}
