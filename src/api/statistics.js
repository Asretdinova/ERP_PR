import request from '../utils/request'

export function getAdmin(data) {
  return request({
      url: '/api/statistics/admin/',
      method: 'get',
      params: data
  })
}

export function getStatisticArticles(data) {
  return request({
      url: '/api/statistics/articles/',
      method: 'get',
      params: data
  })
}

export function getStatisticCritics(data) {
  return request({
      url: '/api/statistics/critics/',
      method: 'get',
      params: data
  })
}

export function getStatisticCriticsAll(data) {
  return request({
      url: '/api/statistics/critics/all/',
      method: 'get',
      params: data
  })
}