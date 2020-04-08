import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import department from './department'

export default new Vuex.Store({
    modules:{
        department
    }
})