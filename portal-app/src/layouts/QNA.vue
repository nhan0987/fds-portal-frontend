<template>
  <v-app dark>
    <v-content>
      <v-container fluid fill-height>
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "QNA",
  components: {}
};
</script>
