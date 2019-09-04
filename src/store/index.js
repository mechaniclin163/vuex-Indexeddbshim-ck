import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let moduleA = {
  namespaced: true,
  state: {
      countModuleA: 1111,
      totalModuleA: 11
  },
  mutations: {
    countModuleAdd(state, n) {
      console.log(1111111111111111)
          state.countModuleA += n
      }
  },
  getters: {
    todoCount: state => {
      return state.countModuleA
    }
  },
  actions: {
    countAddActions (context, n) {
      console.log('------------')
      context.commit('countModuleAdd', n)
    }
  },
}

const store = new Vuex.Store({
    state: {
        count: 1000,
        total: 100
    },
    mutations: {
        countAdd(state, n) {
            state.count += n
        }
    },
    getters: {
      todoCount: (state, getters) => {
        console.log(getters['moduleA/countModuleA'])
        return state.count
      }
    },
    // 'moduleA/countModuleA'
    actions: {
      countAddActions (context, n) {
        context.commit('countAdd', n)
      }
    },
    modules: {
      moduleA: moduleA
    }
})

export default store