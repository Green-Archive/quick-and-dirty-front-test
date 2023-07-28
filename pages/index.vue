<template>
  <v-container>
    <v-row class="mb-12" justify="center" align="center">
      <div class="text-h1">Admin</div>
    </v-row>

    <v-row justify="center" align="center">
      <v-text-field
        v-model="user.username"
        outlined
        label="User"
        prepend-inner-icon="mdi-account"
      ></v-text-field>
    </v-row>

    <v-row justify="center" align="center">
      <v-text-field
        v-model="user.password"
        outlined
        label="Password"
        prepend-inner-icon="mdi-lock"
        type="password"
      ></v-text-field>
    </v-row>
    <v-row justify="center" align="center">
      <v-btn @click="login"> Login </v-btn>
      <!-- <v-btn to="/activities"> Login </v-btn> -->
    </v-row>
    

    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
const localStorage = window.localStorage;

export default {
  name: "Login",
  data: () => ({
    user: {
      username: "",
      password: "",
    },
    snackbar: false,
    snackbarText: "",
  }),
  created() {},
  methods: {
    async singIn() {
      const apiURL = "/auth/signin";

      try {
        const res = await this.$axios.$post(apiURL, this.user);
        // Save the token to localStorage
        localStorage.setItem("jwtToken", res.response.token);

        this.$router.push("/activities");
        console.log(res.response.token);
        //Bearer eyJhbGciOiJSUzI1NiIs Something like that
      } catch (error) {
        this.snackbar = true;
        this.snackbarText = error.response.data.message;
      }
    },
    async login(e) {
        e.preventDefault();

        const payload = {
          username: this.user.username,
          password: this.user.password,
        };

        console.log(this.user.username, this.user.password);

        try {
          await this.$auth.loginWith('local', {
            data: payload
          });
          this.$router.push('/activities');
        } catch (e) {
          this.$router.push('/');
        }
      },
  },
};
</script>
