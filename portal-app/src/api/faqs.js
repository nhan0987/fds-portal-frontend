/**
 * Mocking client-server processing
 */

window._questionItems = [
  {
    askByUserName: "user 1",
    askByUserAddress: "address 1",
    questionId: "101",
    answerContent: "<p><strong>Answer content 1</strong></p>",
    modifiedDate: "02/12/2019",
    askByUserPhone: "User phone",
    assignCategory: "0",
    askByUserEmail: "erewr@gmail.com",
    createDate: "02/12/2019",
    askContent: "ser",
    status: 1
  },
  {
    askByUserName: "user 2",
    askByUserAddress: "address 2",
    questionId: "102",
    answerContent: "",
    modifiedDate: "02/12/2019",
    askByUserPhone: "User phone",
    assignCategory: "0",
    askByUserEmail: "erewr@gmail.com",
    createDate: "02/12/2019",
    askContent: "ser",
    status: 0
  }
];

window._assetcategories = [
  {
    categoryId: 1,
    name: "Lĩnh vực HTTT",
    title: "CNTT"
  },
  {
    categoryId: 2,
    name: "Lĩnh vực CNPM",
    title: "CNTT"
  },
  {
    categoryId: 3,
    name: "Lĩnh vực KTDN",
    title: "KTDN"
  }
];

const endPoint = window.themeDisplay
  ? window.themeDisplay.getCDNBaseURL() + "/o/v2/"
  : "http://localhost:8081/api/";
const urlQuestions = endPoint + "questions";
const urlAssetcategories = endPoint + "assetcategory";

const hasClient = {
  getAssetcategories(query, cb, errorCb) {
    const result = {
      total: window._questionItems.length,
      data: window._questionItems
    };
    setTimeout(() => cb(result), 100);
  },

  getQuestions(query, cb, errorCb) {
    const result = {
      total: window._questionItems.length,
      data: window._questionItems
    };
    setTimeout(() => cb(result), 100);
  },

  readQuestion(questionId, cb, errorCb) {
    setTimeout(
      () =>
        cb(window._questionItems.find(item => item.questionId === questionId)),
      100
    );
  },

  createQuestion(params, cb, errorCb) {
    let result = {};
    for (let key in window._questionItems[0]) {
      if (key === "questionId") {
        result[key] = Math.floor(Math.random() * 10000) + 1;
      } else {
        result[key] = params[key] || window._questionItems[0][key];
      }
    }
    setTimeout(() => cb(result), 100);
  },

  updateQuestion(params, cb, errorCb) {
    let result = {};
    let selected = window._questionItems.find(
      item => item.questionId === params.questionId
    );
    if (selected.questionId) {
      Object.assign(result, selected, params);
    }
    setTimeout(() => cb(result), 100);
  },

  deleteQuestion(questionId, cb, errorCb) {
    window._questionItems = window._questionItems.filter(
      item => item.questionId !== questionId
    );
    setTimeout(
      () =>
        cb(window._questionItems.find(item => item.questionId === questionId)),
      100
    );
  }
};

const hasServer = {
  getQuestions(query, cb, errorCb) {
    // TODO: call api get questions
    let queries = {
      start: -1,
      end: -1
    };
    Object.assign(queries, query);
    window.axios
      .get(urlQuestions, {
        params: queries
      })
      .then(function(response) {
        const serializable = response.data;
        const result = {
          total: serializable.total,
          data: [...(serializable.data || [])]
        };
        cb(result);
      })
      .catch(function(error) {
        // console.error(error);
        errorCb(error);
      });
  },

  readQuestion(questionId, cb, errorCb) {
    // TODO: call api get question by id
    let queries = {
      start: -1,
      end: -1
    };
    const url = urlQuestions + "/" + questionId;
    window.axios
      .get(url, { params: queries })
      .then(function(response) {
        const serializable = response.data;
        cb(serializable);
      })
      .catch(function(error) {
        // console.error(error);
        errorCb(error);
      });
  },

  createQuestion(params, cb, errorCb) {
    // TODO: call api create question

    // if change swagger api, this urlSearchParams is neednt
    let urlParamsCreateQuestion = new URLSearchParams();
    for (const key in params) {
      urlParamsCreateQuestion.append(key, params[key]);
    }
    window.axios
      .post(urlQuestions, urlParamsCreateQuestion)
      .then(function(response) {
        const serializable = response.data;
        cb(serializable);
      })
      .catch(function(error) {
        // console.error(error);
        errorCb(error);
      });
  },

  updateQuestion(params, cb, errorCb) {
    // TODO: call api create question

    // if change swagger api, this urlSearchParams is neednt
    let urlParamsUpdateQuestion = new URLSearchParams();
    for (const key in params) {
      urlParamsUpdateQuestion.append(key, params[key]);
    }
    const url = urlQuestions + "/" + params.questionId;
    window.axios
      .put(url, urlParamsUpdateQuestion)
      .then(function(response) {
        const serializable = response.data;
        cb(serializable);
      })
      .catch(function(error) {
        // console.error(error);
        errorCb(error);
      });
  },

  deleteQuestion(questionId, cb, errorCb) {
    // TODO: call api create question

    const url = urlQuestions + "/" + questionId;
    window.axios
      .delete(url)
      .then(function(response) {
        const serializable = response.data;
        cb(serializable);
      })
      .catch(function(error) {
        // console.error(error);
        errorCb(error);
      });
  }
};

const exportVl = window.themeDisplay ? hasServer : hasClient;
export default exportVl;
