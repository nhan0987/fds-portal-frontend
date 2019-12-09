const AppVariables = {
  data() {
    return {
      get end_point_questions() {
        return window.themeDisplay
          ? window.themeDisplay.getCDNBaseURL() + "/o/rest/questions/"
          : "http://localhost:8080/api/o/rest/questions/";
      },
      get end_point_assetcategories() {
        return window.themeDisplay
          ? window.themeDisplay.getCDNBaseURL() +
              "/o/rest/assetcategories/?masterkey=master.data.faq.assign.category"
          : "http://localhost:8080/api/o/rest/assetcategories/";
      },
      get group_id() {
        return window.themeDisplay
          ? window.themeDisplay.getScopeGroupId()
          : 42942;
      },
      get user_id() {
        return window.themeDisplay ? window.themeDisplay.getUserId() : 32970;
      },
      get user_name() {
        return window.themeDisplay
          ? window.themeDisplay.getUserName()
          : "Mobilink";
      },
      get languageLiferay() {
        return window.themeDisplay
          ? window.themeDisplay.getLanguageId().substring(0, 2)
          : "vi";
      },
      get isOAdmin() {
        return window.FAQ ? window.FAQ.isOAdmin : true;
      },
      customFilterUser(item, queryText) {
        const hasValue = val => (val != null ? val : "");
        let text = hasValue(item.fullName);
        text = text + hasValue(item.email);
        const query = hasValue(queryText);
        return (
          text
            .toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) > -1
        );
      },
      get pageNumberItems() {
        return [5, 10, 15, 20, 25, 30, 40, 50];
      },
      get appNudgeLeft() {
        return 50;
      },
      get appNudgeTop() {
        return 60;
      }
    };
  },
  methods: {
    getPermissionColor(value) {
      let drawColor = {
        read: "accent",
        write: "green darken-2",
        owner: "cyan darken-1"
      };
      return drawColor[value] || "accent";
    }
  }
};

export default AppVariables;
