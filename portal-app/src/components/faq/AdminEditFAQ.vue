<template>
  <v-card class="list-faq">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline primary--text">
          {{ title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-form ref="form" class="px-3">
        <v-alert outlined color="success">
          <div class="title">
            Tạo bởi: {{ question.askByUserName }} - Ngày
            {{ question.createDate }}
          </div>
          <div v-html="question.askContent"></div>
        </v-alert>

        <vue-editor
          v-model="answerContent"
          :editorToolbar="customToolbar"
        ></vue-editor>

        <v-checkbox
          v-model="checkboxStatus"
          :label="checkboxStatus ? 'Công khai' : 'Không công khai'"
        >
        </v-checkbox>

        <v-btn
          :disabled="isLoading"
          :loading="isLoading"
          color="success"
          class="mr-4"
          @click="saveQuestion"
        >
          Lưu lại
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "filter-faq",
  props: {
    title: {
      type: String,
      default: "QUẢN LÝ CÂU HỎI"
    },
    isAdmin: {
      type: Boolean,
      default: true
    }
  },
  components: { VueEditor },
  watch: {
    "$route.params.id"(val) {
      if (val > 0) {
        this.getDetail();
      }
    }
  },
  data: () => ({
    isLoading: false,
    checkboxStatus: false,
    question: {},
    answerContent: "",
    customToolbar: [
      [{ header: [false, 1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" }
      ],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      // ["link", "image", "video"],
      ["clean"] // remove formatting button
    ]
  }),
  async created() {
    // TODO: get list categories
    // this.$httpAxios
    //   .get("https://api.github.com/users/mojombo")
    //   .then(function(response) {
    //     // console.log(response);
    //   })
    //   .catch(function(error) {
    //     // console.error(error);
    //   });
    // console.log(this.$route.params.id);
    this.getDetail();
  },
  methods: {
    async saveQuestion() {
      try {
        this.isLoading = true;
        let dataAdd = new URLSearchParams();
        for (let key in this.question) {
          if (key !== "status" && key !== "answerContent") {
            dataAdd.append(key, this.question[key]);
          }
        }
        dataAdd.append("status", this.checkboxStatus ? 0 : 5);
        dataAdd.append("answerContent", this.answerContent);
        await this.$httpAxios
          .post(
            this.end_point_questions,
            dataAdd,
            {}
          )
          .then(response => response.data);
        this.isLoading = false;
      } catch (error) {
        // console.error(error);
        this.isLoading = false;
      }
    },
    async getDetail() {
      try {
        const data = await this.$httpAxios
          .get(this.end_point_questions + this.$route.params.id)
          .then(response => response.data);
        this.question = data;
        this.checkboxStatus = this.question.status === 0;
        this.answerContent = this.question.answerContent;
      } catch (error) {
        // console.error(error);
        this.question = {
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
        };
        this.checkboxStatus = this.question.status === 0;
        this.answerContent = this.question.answerContent;
      }
    }
  }
};
</script>
