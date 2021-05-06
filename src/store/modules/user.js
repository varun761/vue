import { FirebaseAuth } from '../../firebase.config'

const state = () => ({
    isAuth: false,
    isVerified: false,
    currentUser: null
})

const mutations =  {
    setCurrentUser: (state, value) => {
        state.currentUser = value
    },
    setIsAuth: (state, value) => {
        state.isAuth = value
    },
    setIsVerified: (state, value) => {
        state.isVerified = value
    },
}

const actions = {
    setAutheticatedUser ({ commit }, user) {
        const { emailVerified, email, displayName, uid } = user || {}
        const userDetails = user && Object.keys(user).length > 0 ? { email, displayName, uid} : null
        commit('setIsVerified', emailVerified || false )
        commit('setIsAuth', true || false )
        commit('setCurrentUser', userDetails)
    }
}

const getters = {
    currentUser: state => state && state.currentUser,
    isAuth: state => state && state.isAuth,
    isVerified: state => state && state.isVerified,
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}