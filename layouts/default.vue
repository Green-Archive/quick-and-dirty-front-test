<template>
  <v-app>
    <v-app-bar app elevate-on-scroll>
      <v-toolbar-title>{{ currentPageName }}</v-toolbar-title>

      <slot name="nav-items" />

      <v-spacer></v-spacer>

      <v-btn to="/casereports" color="primary" dark class="mx-2">
        Case Report
      </v-btn>

      <v-btn to="/hospitals" color="primary" dark class="mx-2">
        hospitals
      </v-btn>

      <v-btn to="/typecounseling" color="primary" dark class="mx-2">
        typecounseling
      </v-btn>

      <v-btn to="/ethnic" color="primary" dark class="mx-2"> ethnic </v-btn>

      <v-btn to="/users" color="primary" dark class="mx-2"> users </v-btn>

      <v-btn to="/appointments" color="primary" dark class="mx-2">
        appointments
      </v-btn>

      <v-btn color="purple" dark class="mx-2">
        <v-icon left>mdi-repeat</v-icon>
        Test
      </v-btn>

      <div>
        <v-btn v-if="!loggedIn" to="/login" color="green" dark class="mx-2">
          <v-icon left>mdi-account</v-icon>
          Login
        </v-btn>

        <v-btn v-else @click="logout" color="red" dark class="mx-2">
          <v-icon left>mdi-exit-to-app</v-icon>
          Logout
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-0">
        <Nuxt />
      </v-container>
    </v-main>
    <Snackbar></Snackbar>
  </v-app>
</template>

<script>
import Snackbar from "~/components/Snackbar.vue";

export default {
  name: "DefaultLayout",
  comments: {
    Snackbar,
  },
  computed: {
    currentPageName() {
      return (
        this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1)
      );
    },
  },
  data() {
    return {
      loggedIn: false,
    };
  },

  created() {
    this.loggedIn = this.$auth.loggedIn;
  },

  methods: {
    async test_something() {
      try {
        console.log(this.jwtToken);
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      await this.$auth.logout();
      window.location.reload(true);
    },
  },
};
</script>
