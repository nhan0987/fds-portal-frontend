<template>
  <v-app id="app-faq">
    <v-content>
      <v-container fluid>
        <v-btn
          text
          icon
          color="primary"
          class="faq-change-view"
          @click="isAddPage = true"
          v-if="!isAddPage"
        >
          <v-icon>mdi-bookmark-plus</v-icon>
        </v-btn>
        <v-btn
          text
          icon
          color="primary"
          class="faq-change-view"
          @click="isAddPage = false"
          v-if="isAddPage"
        >
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>
        <v-row class="faq" wrap>
          <v-col xs12>
            <ListFAQ
              title="NHỮNG CÂU HỎI THƯỜNG GẶP"
              :isAdmin="false"
              v-show="!isAddPage"
            />
            <AddFAQ
              v-show="isAddPage"
              @onHideAddPage="() => (isAddPage = false)"
            />
          </v-col>
          <!--
            <v-col xs12 sm7 class="pr-lg-0 pr-xl-0">
              <ListFAQ title="NHỮNG CÂU HỎI THƯỜNG GẶP" :isAdmin="false" />
            </v-col>
            <v-col xs12 sm5>
              <AddFAQ />
            </v-col>
          -->
        </v-row>
      </v-container>
    </v-content>
    <v-fab-transition>
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        dark
        fixed
        bottom
        right
        color="primary"
        @click="toTop"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
// @ is an alias to /src
import ListFAQ from "@/components/faq/ListFAQ.vue";
import AddFAQ from "@/components/faq/AddFAQ.vue";

export default {
  name: "faq",
  components: {
    ListFAQ,
    AddFAQ
  },
  data: () => ({
    fab: false,
    isAddPage: false
  }),
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>

<style scoped>
.faq-change-view {
  position: absolute;
  z-index: 1;
  top: 35px;
  right: 22px;
}
</style>
