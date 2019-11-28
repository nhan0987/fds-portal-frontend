<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-row class="faq" wrap>
          <v-col xs12 sm7 class="pr-lg-0 pr-xl-0">
            <ListFAQ title="NHỮNG CÂU HỎI THƯỜNG GẶP" :isAdmin="false" />
          </v-col>
          <v-col xs12 sm5>
            <AddFAQ />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
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
  }
};
</script>
