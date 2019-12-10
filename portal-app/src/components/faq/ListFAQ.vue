<template>
  <v-card class="list-faq">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline primary--text">
          {{ title }}
          <v-btn
            icon
            color="primary"
            :class="'float-right' + (isOAdmin ? ' mr-5' : '')"
            @click="$router.replace({ name: 'listFAQ' })"
            v-if="isOAdmin"
          >
            <v-icon>mdi-comment-arrow-left-outline</v-icon>
          </v-btn>
          <v-btn
            icon
            color="primary"
            class="float-right"
            @click="$router.replace({ name: 'faq' })"
            v-if="isOAdmin"
          >
            <v-icon>mdi-comment-arrow-right-outline</v-icon>
          </v-btn>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="keyword"
          label="Từ khóa"
          filled
          @change="onFilter"
        ></v-text-field>

        <v-autocomplete
          v-model="assetcategory"
          :items="assetcategories"
          label="Lĩnh vực"
          item-text="name"
          item-value="categoryId"
          filled
          clearable
          @change="onFilter"
        >
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="'--' + data.item.title + '--'"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-form>
      <v-expansion-panels accordion focusable v-if="questions.length > 0">
        <v-expansion-panel
          v-for="(question, index) in questions"
          :key="question.questionId"
        >
          <v-expansion-panel-header class="title primary--text">
            {{ "Câu hỏi " + (start + 1 + index) + ": " + question.askContent }}
          </v-expansion-panel-header>
          <v-menu offset-y v-if="isAdmin">
            <template v-slot:activator="{ on }">
              <v-btn
                text
                icon
                color="primary"
                v-on="on"
                class="custome-expansion-btn"
              >
                <v-icon>mdi-settings</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="viewDetailFAQ(question)">
                <v-list-item-title>
                  <v-icon color="primary">mdi-playlist-edit</v-icon>
                  &nbsp; Chi tiết
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="viewDetailFAQ(question)"
                v-if="!question.answerContent"
              >
                <v-list-item-title>
                  <v-icon color="blue">mdi-message</v-icon>&nbsp; Trả lời
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="toggleStatus(question)">
                <v-list-item-title>
                  <v-icon color="primary">
                    {{
                      question.status === 0
                        ? "mdi-lock"
                        : "mdi-lock-open-variant"
                    }}
                  </v-icon>
                  &nbsp;
                  {{ question.status === 0 ? "Bỏ công khai" : "Công khai" }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteQuestion(question)">
                <v-list-item-title>
                  <v-icon color="red">mdi-delete</v-icon>&nbsp; Xóa
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-expansion-panel-content class="pt-4">
            <v-alert
              outlined
              color="success"
              class="mb-0"
              v-if="question.answerContent && question.answerContent.length > 0"
            >
              <div v-html="question.answerContent"></div>
            </v-alert>
            <v-alert outlined color="warning" class="mb-0" v-else>
              Chưa có câu trả lời
            </v-alert>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-alert outlined color="warning" class="mb-0" v-else>
        Chưa có câu hỏi
      </v-alert>
    </v-card-text>
    <CPagination
      ref="pagination"
      :reNew="Number($route.query.reNew || 0)"
      @changeStartEnd="getFAQs"
    />
    <v-dialog v-model="dialog" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Bạn chắc chắn xóa câu hỏi này?</span>
        </v-card-title>
        <v-card-text>
          {{ questionDeleteHold.askContent }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false">Hủy</v-btn>
          <v-btn color="success" @click="deleteQuestionConfirmed">Đồng ý</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import CPagination from "@/components/CPagination";
export default {
  name: "filter-faq",
  props: {
    title: {
      type: String,
      default: "DANH SÁCH CÂU HỎI"
    },
    isAdmin: {
      type: Boolean,
      default: true
    }
  },
  components: {
    CPagination
  },
  data: () => ({
    dialog: false,
    questionDeleteHold: {},
    start: 0,
    isLoading: false,
    keyword: "",
    questions: [],
    assetcategory: null,
    assetcategories: []
  }),
  async created() {
    this.onFilter();
    try {
      const data = await this.$httpAxios
        .get(this.end_point_assetcategories)
        .then(response => response.data);
      this.assetcategories = data.data;
    } catch (error) {
      // console.error(error);
      this.assetcategories = [
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
    }
  },
  methods: {
    onFilter() {
      this.$router.replace({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          ...this.$route.query,
          reNew: Number(this.$route.query.reNew || 0) + 1,
          keyword: this.keyword || "",
          assetcategory: this.assetcategory || ""
        }
      });
    },
    async getFAQs({ start }) {
      // console.log("getFAQs" + start + " " + end);
      this.start = start;
      if (this.isLoading) {
        return;
      }
      try {
        this.isLoading = true;
        const data = await this.$httpAxios
          .get(this.end_point_questions)
          .then(response => response.data);
        this.$refs.pagination.showPaginationM(data.total || 0);
        this.questions = data.data;
        this.isLoading = false;
      } catch (error) {
        // console.error(error);
        this.questions = [
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
            status: 5
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
        this.isLoading = false;
        this.$refs.pagination.showPaginationM(this.questions.length);
      }
    },
    viewDetailFAQ(item) {
      // console.log("detail: " + item);
      this.$router.push("/admin/" + item.questionId);
    },
    async toggleStatus(item) {
      try {
        let dataAdd = new URLSearchParams();
        const toggle = item.status === 0 ? 5 : 0;
        dataAdd.append("status", toggle);
        const data = await this.$httpAxios
          .put(this.end_point_questions + item.questionId, dataAdd, {})
          .then(response => response.data);
        if (data) {
          item.status = toggle;
        }
      } catch (error) {
        // console.error(error);
      }
    },
    deleteQuestion(item) {
      this.questionDeleteHold = item;
      this.dialog = true;
    },
    async deleteQuestionConfirmed() {
      try {
        this.dialog = false;
        const item = this.questionDeleteHold;
        await this.$httpAxios
          .delete(this.end_point_questions + item.questionId)
          .then(response => response.data);
        this.$router.replace({
          name: this.$route.name,
          params: this.$route.params,
          query: {
            ...this.$route.query,
            reNew: Number(this.$route.query.reNew || 0) + 1
          }
        });
      } catch (error) {
        // console.error(error);
      }
    }
  }
};
</script>

<style>
.v-expansion-panel-header {
  padding-right: 85px;
}
.list-faq .v-expansion-panel-header__icon {
  position: absolute;
  top: 25px;
  right: 20px;
}
.list-faq .custome-expansion-btn {
  position: absolute;
  top: 15px;
  right: 45px;
}
</style>
