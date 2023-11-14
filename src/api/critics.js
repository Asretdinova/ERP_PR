import request from '../utils/request'

export function getCritics(data) {
    return request({
        url: '/api/critics/',
        method: 'get',
        params: data
    })
}
export function getCriticsId(id) {
    return request({
        url: '/api/critics/'+id+'/',
        method: 'get',
    })
}

export function postCritics(data) {
    return request({
        url: '/api/critics/',
        method: 'post',
        data
    })
}

export function putCritics(data, id) {
    return request({
        url: '/api/critics/'+id +'/',
        method: 'put',
        data
    })
}

export function deleteCritics(id) {
    return request({
        url: '/api/critics/'+id +'/',
        method: 'delete'
    })
}

// ------------Type------------------

export function getCriticsType(data) {
    return request({
        url: '/api/critics/types/',
        method: 'get',
        params: data
    })
}
export function getCriticsTypeId(id) {
    return request({
        url: '/api/critics/types/'+id+'/',
        method: 'get',
    })
}

export function postCriticsType(data) {
    return request({
        url: '/api/critics/types/',
        method: 'post',
        data
    })
}

export function putCriticsType(data, id) {
    return request({
        url: '/api/critics/types/'+id +'/',
        method: 'put',
        data
    })
}

export function deleteCriticsType(id) {
    return request({
        url: '/api/critics/types/'+id +'/',
        method: 'delete'
    })
}


// ------------Status------------------

export function getCriticsStatus(status) {
    return request({
        url: '/api/critics/filter/',
        method: 'get',
        params: status
    })
}
