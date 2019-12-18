import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alertColor: "success",
    alertStatus: false,
    alertMessage: ""
  },
  mutations: {
    setAlert(state, payload) {
      state.alertColor = payload.alertColor;
      state.alertStatus = payload.alertStatus;
      state.alertMessage = payload.alertMessage;
    }
  },
  actions: {
    async showAlert({ commit }, payload) {
      commit("setAlert", payload);
      setTimeout(() => {
        commit("setAlert", {
          alertColor: "success",
          alertStatus: false,
          alertMessage: ""
        });
      }, 5000);
    }
  },
  getters: {
    alertColor: state => {
      return state.alertColor;
    },
    alertStatus: state => {
      return state.alertStatus;
    },
    alertMessage: state => {
      return state.alertMessage;
    }
  },
  modules: {}
});
