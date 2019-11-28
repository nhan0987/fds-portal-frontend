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
      <v-form ref="form" class="px-3" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
          filled
          @change="onFilter"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          filled
          @change="onFilter"
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="Item"
          required
          filled
          @change="onFilter"
        ></v-select>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Validate
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          Reset Form
        </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
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
  components: {},
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
    total: 0
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
    this.onFilter();
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
