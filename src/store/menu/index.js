export default {
    state:{
        menu:[]
    },
    getters:{
        menu: state => state.menu
    },
    mutations:{
        MENU(state, params) {
            state.menu = params
        }
    },
    actions:{
        doMenu({commit}, params) {
            commit('MENU', params)
        }
    }
}