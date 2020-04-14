import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import department from './department'
import menu from './menu'

export default new Vuex.Store({
    modules:{
        department,
        menu,
    }
})