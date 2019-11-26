<template>
  <v-row class="faq" wrap>
    <v-col xs12 sm7>
      Danh sach cau hoi
      <ListFAQ />
    </v-col>
    <v-col xs12 sm5>
      Đặt câu hỏi
      <AdminEditFAQ />
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
import ListFAQ from "@/components/faq/ListFAQ.vue";
import AdminEditFAQ from "@/components/faq/AdminEditFAQ.vue";

export default {
  name: "faq",
  components: {
    ListFAQ,
    AdminEditFAQ
  },
  data: () => ({
    valid: true
  }),
  created() {
    // TODO: get list Question
    // this.$httpAxios
    //   .get("https://api.github.com/users/mojombo")
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
