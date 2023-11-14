import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token='') {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getValues(key) {
    return Cookies.get(key)
}

export function setValues(key, val) {
    return Cookies.set(key, val)
}
