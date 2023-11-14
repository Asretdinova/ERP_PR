import router from './router'

import {getToken} from './utils/auth' // getToken from cookie

// permission judge function

const whiteList = ['/signIn', '/forgot-password' ]// no redirect whitelist

router.beforeEach((to, from, next) => {
    if (getToken()) { // determine if there has token
        /* has token*/
        if (to.path === '/signIn') {
            next({path: '/'})
        } else {
            next()// Hack method to ensure that addRoutes is complete ,set the replace: true so the navigation will not leave a history record
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) { // In the log-in white list, enter directly
            next()
        } else {
            next('/signIn') // Otherwise all redirect to login page
        }
    }
})

router.afterEach(() => {
})
