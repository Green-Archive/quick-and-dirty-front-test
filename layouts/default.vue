<template>
  <v-app>
    <v-app-bar app elevate-on-scroll>
      <v-toolbar-title>{{ currentPageName }}</v-toolbar-title>
      <v-spacer></v-spacer>

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

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" color="primary" dark class="mx-2">
            <v-icon left>mdi-dots-vertical</v-icon> More
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in moreButtons" :key="index">
            <v-list-item-action>
              <v-btn :to="item.to" color="primary" dark>
                <v-icon left>{{ item.icon }}</v-icon> {{ item.label }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Add the rest of your buttons here -->
      <!-- ... -->

      <!-- Add the login/logout buttons -->
      <!-- ... -->
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
      moreButtons: [
        { to: "/answers", icon: "mdi-account", label: "Answers" },
        { to: "/questions", icon: "mdi-account", label: "Questions" },
        { to: "/counselors", icon: "mdi-account", label: "Counselors" },
        { to: "/casereports", icon: "mdi-file", label: "Case Report" },
        { to: "/hospitals", icon: "mdi-hospital", label: "Hospitals" },
        {
          to: "/typecounseling",
          icon: "mdi-bookmark",
          label: "Type Counseling",
        },
        { to: "/ethnic", icon: "mdi-flag", label: "Ethnic" },
        { to: "/users", icon: "mdi-account-multiple", label: "Users" },
        { to: "/appointments", icon: "mdi-calendar", label: "Appointments" },
        {
          to: "/forwardcases",
          icon: "mdi-fast-forward",
          label: "ForwardCases",
        },
        {
          to: "/questionforms",
          icon: "mdi-fast-forward",
          label: "QuestionForms",
        },
      ],
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
