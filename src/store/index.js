import { createStore } from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'
// Vue.use(Vuex);

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

// const store = new Vuex.Store({
//   state: {
//       user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
//       //若localSorage存在token，将值赋给Vuex.state.token
//       token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
//   },
//   mutations: {
//       setUser(state, user) {
//           state.user = user
//           localStorage.setItem('user', JSON.stringify(user))
//       },
//       setToken(state, token) {
//           localStorage.setItem('token', token)
//           state.token = token
//       },
//       logout(state) {
//           localStorage.removeItem('token')
//           state.token = null
//           localStorage.removeItem('user')
//           state.user = null
//       }
//   }
// })

// export default store;
// const store = new Vuex.Store({
  
//     state: {
//       // 存储token
//       Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
//     },
    
//     mutations: {
//       // 修改token，并将token存入localStorage
//       changeLogin (state, user) {
//         state.Authorization = user.Authorization;
//         localStorage.setItem('Authorization', user.Authorization);
//       }
//     }
//   });
    
//   export default store;
