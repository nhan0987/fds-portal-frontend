<template>
  <v-card class="list-faq">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline primary--text">
          {{ title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-form ref="form" class="px-3" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
        filled
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
        filled
      ></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Item"
        required
        filled
      ></v-select>
    </v-form>
    <v-expansion-panels accordion focusable>
      <v-expansion-panel v-for="(item, i) in 5" :key="i">
        <v-expansion-panel-header class="title primary--text">
          Item Item Item Item Item Item Item Item Item Item Item Item Item Item Item Item Item Item Item Item Item Item Item Item Item Item
        </v-expansion-panel-header>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text icon color="primary" v-on="on" class="custome-expansion-btn">
              <v-icon>mdi-settings</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-icon color="primary">mdi-playlist-edit</v-icon>&nbsp; Chi tiết
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-icon color="blue">mdi-message</v-icon>&nbsp; Trả lời
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-icon color="primary">{{ 111 === 1 ? 'mdi-lock' : 'mdi-lock-open-variant' }}</v-icon>&nbsp;
                  {{ 111 === 1 ? 'Bỏ công khai' : 'Công khai' }}
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
    <CPagination />
  </v-card>
</template>

<script>
import CPagination from "@/components/CPagination";
export default {
  name: "filter-faq",
  props: {
    title: {
      type: String,
      default: "NHỮNG CÂU HỎI THƯỜNG GẶP"
    },
    total: {
      type: Number,
      default: 0
    }
  },
  components: {
    CPagination
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    page: 1
  }),
  created() {
    // TODO: get list categories
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

