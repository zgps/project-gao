export default {
    state:{
        dept:[]
    },
    getters:{
        dept: state => state.dept
    },
    mutations:{
        DEPT(state, params) {
            state.dept = params
        }
    },
    actions:{
        department({commit}, params) {
            commit('DEPT', params)
        }
    }
}