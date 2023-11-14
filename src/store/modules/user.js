import {getToken, setToken, removeToken, setValues, getValues} from '../../utils/auth'
import {postSignIn, getAccount} from '../../api/user'

const user = {
    state: {
        token: getToken(),
        user: (getValues('user')) ? JSON.parse(getValues('user')) : {}
    },
    getters: {
        token: state => state.token,
        user: state => state.user
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER: (state, user) => {
            state.user = user
        },
    },
    actions: {
        LoginByUsername({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                postSignIn(userInfo).then(res => {
                    commit('SET_TOKEN', res.data.access)
                    setToken(res.data.access)
                  getAccount().then(res => {
                    commit('SET_USER', res.data)
                    setValues('user', res.data)
                      resolve(res.data)
                  })
                    // setValues('user', res.data.user)
                }).catch(error => {
                    reject(error)
                    return error
                })
            })
        },
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_USER', '')

                removeToken()
                setValues('user', '[]')
                resolve()
            })
        },
    }
}

export default user
