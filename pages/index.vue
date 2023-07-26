<template>
  <v-container>
    <v-row class="mb-12" justify="center" align="center">
      <div class="text-h1">Login</div>
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
      
      <v-btn @click="singIn"> Login </v-btn>
      <!-- <v-btn to="/activities"> Login </v-btn> -->

    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    user: {
      username: "",
      password: "",
    },
  }),
  created() {},
  methods: {
    async singIn() {
      const apiURL = "/auth/signin";

      try {
        const res = await this.$axios.$post(apiURL, this.user);
        this.$router.push("/");
        console.log(res);
        console.log("Done");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
