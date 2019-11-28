<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Page is not found.</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="error" @click="$router.push('/')" text>
              back
              <v-icon right>mdi-lock-reset</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "FourOhFour",
  props: {
    lang: {
      type: String,
      default: "en"
    }
  },
  created() {}
};
</script>
