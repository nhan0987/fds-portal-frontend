<template>
  <v-app id="app-faq">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
      clipped
      absolute
    >
      <v-list rounded>
        <v-list-item-group v-model="menuSelected" color="primary">
          <v-tooltip right v-for="(item, index) in items" :key="item.title">
            <template v-slot:activator="{ on }">
              <v-list-item v-on="on" @click="onFilter(item, index)">
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
      <v-container fluid class="pl-0 pt-0">
        <!-- fill-height -->
        <v-row class="faq" wrap>
          <v-col xs12 sm12 class="pt-0">
            <!-- <transition>
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition> -->
            <router-view></router-view>
          </v-col>
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
        queries: { status: "0,1,2,5" }
      },
      {
        title: "Câu hỏi đã trả lời",
        icon: "mdi-reply-all",
        color: "success",
        queries: { status: 2 }
      },
      {
        title: "Câu hỏi chưa trả lời",
        icon: "mdi-reply",
        color: "warning",
        queries: { status: 1 }
      },
      {
        title: "Câu hỏi công khai",
        icon: "mdi-earth",
        color: "success",
        queries: { status: 0 }
      },
      {
        title: "Câu hỏi chưa công khai",
        icon: "mdi-earth-off",
        color: "error",
        queries: { status: 5 }
      }
    ],
    mini: false,
    menuSelected: 0,
    fab: false
  }),
  created() {},
  methods: {
    onFilter(item, index) {
      this.menuSelected = index;
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
    },
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
