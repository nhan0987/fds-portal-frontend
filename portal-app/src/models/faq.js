const FAQ = {
  ASK_BY_USER_NAME: "askByUserName",
  askByUserAddress: "askByUserAddress",
  questionId: "questionId",
  answerContent: "answerContent",
  modifiedDate: "modifiedDate",
  askByUserPhone: "askByUserPhone",
  assignCategory: "assignCategory",
  askByUserEmail: "askByUserEmail",
  createDate: "createDate",
  askContent: "askContent",
  status: "status",
  mixin: {
    data() {
      return {
        get faq_askByUserName() {
          return "askByUserName";
        }
      };
    }
  }
};
// unuse
export default FAQ;
