<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list rounded>
        <v-list-item-group v-model="item" color="primary">
          <v-tooltip right v-for="item in items" :key="item.title">
            <template v-slot:activator="{ on }">
              <v-list-item v-on="on" @click="onFilter(item)">
                <v-list-item-icon>
                  <v-icon :color="item.color" v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <!-- fill-height -->
        <v-row class="faq" wrap>
          <v-col xs12 sm12>
            <transition>
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "faq-admin",
  components: {},
  data: () => ({
    drawer: true,
    items: [
      {
        title: "Tất cả câu hỏi",
        icon: "mdi-all-inclusive",
        color: "info",
        queries: { all: true }
      },
      {
        title: "Câu hỏi đã trả lời",
        icon: "mdi-reply-all",
        color: "success",
        queries: { answered: true }
      },
      {
        title: "Câu hỏi chưa trả lời",
        icon: "mdi-reply",
        color: "warning",
        queries: { answered: false }
      },
      {
        title: "Câu hỏi công khai",
        icon: "mdi-earth",
        color: "success",
        queries: { publish: 1 }
      },
      {
        title: "Câu hỏi chưa công khai",
        icon: "mdi-earth-off",
        color: "error",
        queries: { publish: 0 }
      }
    ],
    mini: false,
    item: 0
  }),
  created() {},
  methods: {
    onFilter(item) {
      let oldQueries = { ...this.$route.query };
      this.items.forEach(item => {
        for (const key in item.queries) {
          delete oldQueries[key];
        }
      });
      this.$router.replace({
        name: "listFAQ",
        params: this.$route.params,
        query: {
          ...oldQueries,
          ...item.queries,
          reNew: Number(this.$route.query.reNew || 0) + 1
        }
      });
    }
  }
};
</script>
