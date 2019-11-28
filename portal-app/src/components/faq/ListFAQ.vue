<template>
  <v-card class="list-faq">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline primary--text">
          {{ title }}
          <v-btn
            icon
            color="primary"
            class="float-right"
            @click="$router.replace({ name: 'listFAQ' })"
          >
            <v-icon>mdi-comment-arrow-left-outline</v-icon>
          </v-btn>
          <v-btn
            icon
            color="primary"
            class="float-right"
            @click="$router.replace({ name: 'faq' })"
          >
            <v-icon>mdi-comment-arrow-right-outline</v-icon>
          </v-btn>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="name"
          label="Name"
          filled
          @change="onFilter"
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="E-mail"
          filled
          @change="onFilter"
        ></v-text-field>

        <v-select
          v-model="select"
          :categories="categories"
          label="Item"
          filled
          @change="onFilter"
        ></v-select>
      </v-form>
      <v-expansion-panels accordion focusable>
        <v-expansion-panel v-for="question in questions" :key="question">
          <v-expansion-panel-header class="title primary--text">
            Item Item Item Item Item Item Item Item Item Item Item Item
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
              <v-list-item @click="viewDetailFAQ(item)">
                <v-list-item-title>
                  <v-icon color="primary">mdi-playlist-edit</v-icon>
                  &nbsp; Chi tiết
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-icon color="blue">mdi-message</v-icon>&nbsp; Trả lời
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-icon color="primary">
                    {{ 111 === 1 ? "mdi-lock" : "mdi-lock-open-variant" }}
                  </v-icon>
                  &nbsp;{{ 111 === 1 ? "Bỏ công khai" : "Công khai" }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-icon color="red">mdi-delete</v-icon>&nbsp; Xóa
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    <CPagination
      ref="pagination"
      :reNew="Number($route.query.reNew || 0)"
      @changeStartEnd="getFAQs"
    />
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
    name: "",
    email: "",
    select: null,
    questions: ["Item 1", "Item 2", "Item 3", "Item 4"],
    categories: ["Item 1", "Item 2", "Item 3", "Item 4"]
  }),
  created() {
    this.onFilter();
  },
  methods: {
    onFilter() {
      this.$router.replace({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          ...this.$route.query,
          reNew: Number(this.$route.query.reNew || 0) + 1,
          name: this.name,
          select: this.select,
          email: this.email
        }
      });
    },
    getFAQs({ start, end }) {
      console.log("getFAQs" + start + " " + end);
      let vm = this;
      const showPagination = (total) => {
        vm.$refs.pagination.showPaginationM(total);
      };
      // TODO: get list FAQs
      this.$httpAxios
        .get("https://api.github.com/users/mojombo")
        .then(function(response) {
          console.log(response);
          showPagination(500);
        })
        .catch(function(error) {
          console.log(error);
          showPagination(100);
        });
    },
    viewDetailFAQ(item) {
      console.log("detail: " + item);
      this.$router.push("/admin/" + item);
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
