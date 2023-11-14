import request from '../utils/request'

export function getTasks(data) {
    return request({
        url: '/api/tasks/',
        method: 'get',
        params: data
    })
}
export function getTasksId(id) {
    return request({
        url: '/api/tasks/'+id+'/',
        method: 'get',
    })
}

export function postTasks(data) {
    return request({
        url: '/api/tasks/',
        method: 'post',
        data
    })
}

export function putTasks(data, id) {
    return request({
        url: '/api/tasks/'+id +'/',
        method: 'put',
        data
    })
}

export function deleteTasks(id) {
    return request({
        url: '/api/tasks/'+id +'/',
        method: 'delete'
    })
}

