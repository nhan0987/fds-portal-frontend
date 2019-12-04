<template>
  <v-tabs background-color="white" color="primary" class="elevation-2" dark>
    <v-tabs-slider></v-tabs-slider>
    <v-tab :href="`#tab-1`">
      {{ title }}
      <v-icon class="pl-2">mdi-phone</v-icon>
    </v-tab>
    <v-tab-item :value="'tab-1'">
      <v-card flat tile>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="askByUserName"
              :counter="75"
              :rules="askByUserNameRules"
              label="Người đặt câu hỏi"
              required
              filled
            ></v-text-field>
            <v-text-field
              v-model="askByUserEmail"
              :rules="askByUserEmailRules"
              label="E-mail"
              required
              filled
            ></v-text-field>
            <v-text-field
              v-model="askByUserPhone"
              label="Số điện thoại"
              filled
            ></v-text-field>
            <v-textarea
              v-model="askByUserAddress"
              label="Địa chỉ"
              filled
            ></v-textarea>
            <v-autocomplete
              v-model="assetcategory"
              :disabled="isAdding"
              :items="assetcategories"
              :rules="[v => !!v || 'Bắt buộc chọn lĩnh vực']"
              label="Lĩnh vực"
              item-text="name"
              item-value="categoryId"
              required
              filled
            >
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="'--' + data.item.title + '--'"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
            <v-textarea
              v-model="askContent"
              counter
              :rules="askContentRules"
              label="Nội dung câu hỏi"
              required
              filled
            ></v-textarea>
            <v-btn
              :disabled="!valid || isAdding"
              color="success"
              class="mr-4"
              @click="addQuestion"
            >
              Gửi câu hỏi
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <v-btn color="error" class="mr-4" @click="reset">
              Hủy
              <v-icon right dark>mdi-cancel</v-icon>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  name: "admin-edit-faq",
  props: {
    title: {
      type: String,
      default: "ĐẶT CÂU HỎI"
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    valid: true,
    isAdding: false,
    askByUserName: "",
    askByUserNameRules: [
      v => !!v || "Bắt buộc nhập người đặt câu hỏi",
      v =>
        (v && v.trim().length <= 75) || "Tên người đặt câu hỏi lớn hơn 75 ký tự"
    ],
    askByUserEmail: "",
    askByUserEmailRules: [
      v => !!v || "Bắt buộc nhập e-mail",
      v => /.+@.+\..+/.test(v) || "E-mail không hợp lệ"
    ],
    askByUserPhone: "",
    askByUserAddress: "",
    assetcategory: 0,
    assetcategories: [],
    askContent: "",
    askContentRules: [
      v => !!v || "Bắt buộc phải nhập nội dung câu hỏi",
      v => (v && v.trim().length > 10) || "Nội dung câu hỏi lớn hơn 10 ký tự"
    ]
  }),
  async created() {
    try {
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
      const data = await this.$httpAxios
        .get(this.end_point_assetcategories)
        .then(response => response.data);
      this.assetcategories = data.data;
    } catch (error) {
      console.log(error);
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
    async addQuestion() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        this.isAdding = true;
        let dataAdd = new URLSearchParams();
        dataAdd.append("askByUserName", this.askByUserName || "");
        dataAdd.append("askByUserEmail", this.askByUserEmail || "");
        dataAdd.append("askByUserPhone", this.askByUserPhone || "");
        dataAdd.append("askByUserAddress", this.askByUserAddress || "");
        dataAdd.append("assetcategory", this.assetcategory || 0);
        dataAdd.append("askContent", this.askContent || "");
        const data = await this.$httpAxios
          .post(this.end_point_assetcategories, dataAdd, {})
          .then(response => response.data);
        if (data) {
          this.$router.replace({
            name: this.$route.name,
            params: this.$route.params,
            query: {
              ...this.$route.query,
              reNew: Number(this.$route.query.reNew || 0) + 1
            }
          });
        }
        this.$refs.form.reset();
        this.isAdding = false;
      } catch (error) {
        console.log(error);
        this.isAdding = false;
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
