import questionApi from "@/api/faqs";

// initial state
const state = {
  assetcategories: []
};

// getters
const getters = {
  assetcategories: state => {
    return state.assetcategories;
  }
};

// actions
const actions = {
  async getQuestionItems({ dispatch, commit, getters }, queries) {
    return new Promise((resolve, reject) => {
      let cb = questions => {
        commit("setTotalQuestionItems", questions.total);
        commit("setQuestionItems", questions.data);
        resolve(questions);
      };

      // TODO: check when call api error
      let errorCb = error => {
        console.log(error);
        // commit('setQuestionItems', [])
        // reject(error)
      };
      questionApi.getQuestions(getters.queries, cb, errorCb);
    });
  },
  async createQuestion({ commit, getters }, payload) {
    return new Promise((resolve, reject) => {
      let cb = question => {
        const questionItems = getters.questionItems.concat([question]);
        commit("setTotalQuestionItems", getters.totalQuestionItems + 1);
        commit("setQuestionItems", questionItems);
        resolve(question);
      };

      // TODO: check when call api error
      let errorCb = error => {
        console.log(error);
        reject(error);
      };
      questionApi.createQuestion(payload, cb, errorCb);
    });
  },
  async readQuestion({ commit }, jobPosId) {
    return new Promise((resolve, reject) => {
      let cb = question => {
        resolve(question);
      };

      // TODO: check when call api error
      let errorCb = error => {
        console.log(error);
        reject(error);
      };
      questionApi.readQuestion(jobPosId, cb, errorCb);
    });
  },
  async updateQuestion({ commit, getters }, payload) {
    return new Promise((resolve, reject) => {
      let cb = question => {
        let questionItems = getters.questionItems;
        let currentIndex = questionItems.findIndex(
          item => item.jobPosId === question.jobPosId
        );
        if (currentIndex >= 0) {
          for (let key in question) {
            questionItems[currentIndex][key] = question[key];
          }
        } else {
          questionItems.push(question);
          commit("setTotalQuestionItems", getters.totalQuestionItems + 1);
        }
        commit("setQuestionItems", questionItems);
        resolve(question);
      };

      // TODO: check when call api error
      let errorCb = error => {
        console.log(error);
        reject(error);
      };
      questionApi.updateQuestion(payload, cb, errorCb);
    });
  },
  async deleteQuestion({ commit, getters }, jobPosId) {
    return new Promise((resolve, reject) => {
      let cb = question => {
        const questionItems = getters.questionItems.filter(
          item => item.jobPosId !== jobPosId
        );
        commit("setTotalQuestionItems", getters.totalQuestionItems - 1);
        commit("setQuestionItems", questionItems);
        resolve(question);
      };

      // TODO: check when call api error
      let errorCb = error => {
        console.log(error);
        reject(error);
      };
      questionApi.deleteQuestion(jobPosId, cb, errorCb);
    });
  },
  async putQuestionLogo({ commit, getters }, payload) {
    return new Promise((resolve, reject) => {
      let cb = question => {
        resolve(question);
      };

      // TODO: check when call api error
      let errorCb = error => {
        console.log(error);
        reject(error);
      };
      questionApi.putQuestionLogo(payload, cb, errorCb);
    });
  },
  async getQuestionLogo({ commit, getters }, jobPosId) {
    return new Promise((resolve, reject) => {
      let cb = question => {
        resolve(question);
      };

      // TODO: check when call api error
      let errorCb = error => {
        console.log(error);
        reject(error);
      };
      questionApi.getQuestionLogo(jobPosId, cb, errorCb);
    });
  }
};

// mutations
const mutations = {
  setTotalQuestionItems(state, payload) {
    state.totalQuestionItems = payload;
  },
  setQuestionItems(state, payload) {
    state.questionItems = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
