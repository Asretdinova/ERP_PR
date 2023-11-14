import request from '../utils/request'

export function getEvents(data) {
  return request({
    url: '/api/events/',
    method: 'get',
    params: data
  })
}
export function getEventsId(id) {
  return request({
    url: '/api/events/'+id+'/',
    method: 'get',
  })
}

export function postEvents(data) {
  return request({
    url: '/api/events/',
    method: 'post',
    data
  })
}

export function putEvents(data, id) {
  return request({
    url: '/api/events/'+id +'/',
    method: 'put',
    data
  })
}

export function deleteEvents(id) {
  return request({
    url: '/api/events/'+id +'/',
    method: 'delete'
  })
}