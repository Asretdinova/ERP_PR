import request from '../utils/request'

export function getPublications(data) {
    return request({
        url: '/api/publications/',
        method: 'get',
        params: data
    })
}
export function getPublicationsId(id) {
    return request({
        url: '/api/publications/'+id+'/',
        method: 'get',
    })
}

export function postPublications(data) {
    return request({
        url: '/api/publications/',
        method: 'post',
        data
    })
}

export function putPublications(data, id) {
    return request({
        url: '/api/publications/'+id +'/',
        method: 'put',
        data
    })
}

export function deletePublications(id) {
    return request({
        url: '/api/publications/'+id +'/',
        method: 'delete'
    })
}

export function postPublicationPhotos(data) {
    return request({
        url: '/api/publication-photos/',
        method: 'POST',
        data
    })
}

export function putPublicationPhotos(data, id) {
    return request({
        url: '/api/publication-photos/'+ id + '/',
        method: 'PUT',
        data
    })
}

export function deletePublicationPhotos(id) {
    return request({
        url: '/api/publication-photos/'+id+'/',
        method: 'DELETE'
    })
}
