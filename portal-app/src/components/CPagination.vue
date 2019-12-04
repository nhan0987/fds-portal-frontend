<template>
  <v-card class="custome-pagination">
    <v-card-actions>
      <v-list-item :class="{ grow: $vuetify.breakpoint.name !== 'xs' }">
        <v-list-item-content>
          <v-list-item-title @click="page = 1">
            Tổng số {{ total }}
          </v-list-item-title>
        </v-list-item-content>
        <v-row align="center" justify="end">
          <v-col class="d-sm-flex py-0">
            <v-select
              class="ml-1"
              hide-details
              v-model="select"
              :items="items"
              @input="changeStartEnd"
            ></v-select>
            <v-pagination
              v-if="showPagination"
              v-model="page"
              :length="length"
              :total-visible="5"
              @input="changeStartEnd"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "c-pagination",
  props: {
    reNew: {
      type: Number,
      default: 0
    }
  },
  watch: {
    reNew() {
      // console.error("re new");
      this.page = 1;
      this.showPagination = false;
      this.changeStartEnd();
    }
  },
  data: () => ({
    items: [5, 10, 30, 50],
    select: 5,
    page: 1,
    length: 0,
    showPagination: false,
    total: 0
  }),
  created() {
    this.$nextTick(() => {
      this.changeStartEnd();
    });
  },
  methods: {
    changeStartEnd() {
      const start = this.page * this.select - this.select;
      const end = this.page * this.select;
      this.$emit("changeStartEnd", {
        start,
        end
      });
    },
    showPaginationM(total) {
      this.length = Math.ceil(Number(total || 0) / this.select);
      this.total = total;
      this.showPagination = true;
    }
  }
};
</script>

<style scoped>
.custome-pagination .v-select {
  padding: 0;
  width: 65px;
  flex: 0 0 auto;
  margin-left: auto !important;
}
.v-pagination {
  width: auto;
}
</style>
