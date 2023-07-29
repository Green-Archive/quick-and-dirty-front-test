
<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="users" class="elevation-1">
          <template v-slot:top>
            <v-toolbar color="pink" flat>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-progress-linear
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
      
      
      
      
    <script>
export default {
  layout: "default",

  data() {
    return {
      loggedIn: false,
      users: [],

      dialog: false,
      dialogDelete: false,

      headers: [
        {
          text: "Username",
          align: "start",
          sortable: false,
          value: "username",
        },
        { text: "Role", value: "role", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  async fetch() {
    const res = await await this.$axios.$get("/users");
    if (!res) {
      console.log("something wrong");
    } else {
      this.users = res.response;
      console.log(this.users);
    }
  },

  created() {
    this.loggedIn = this.$auth.loggedIn;
  },

  methods: {
    async logout() {
      await this.$auth.logout();
      window.location.reload(true);
    },
  },
};
</script>