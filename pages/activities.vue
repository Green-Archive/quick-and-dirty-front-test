<template>
  <v-container fluid class="pa-0">
    <v-toolbar elevation="4">
      <v-toolbar-title>Users</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2 mx-1" v-bind="attrs" v-on="on">
            <v-icon left> mdi-plus </v-icon>

            Add
          </v-btn>

          <v-btn @click="test_something" color="purple" dark class="mb-2 mx-1">
            <v-icon left> mdi-minus </v-icon>

            Test
          </v-btn>

          <v-btn v-if="loggedIn" @click="logout" color="red" dark class="mb-2 mx-1">
            <v-icon left> mdi-exit-to-app </v-icon>

            Logout
          </v-btn>

          <v-btn v-else to="/" color="green" dark class="mb-2 mx-1"  >
            <v-icon left> mdi-account </v-icon>

            Login
          </v-btn>

        </template>
        <v-card>
          <v-card-title class="blue">
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.name"
                    label="Activity name"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions class="d-flex justify-center">
            <v-btn color="blue darken-1" outlined @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" @click="save">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="red text-h5">Delete</v-card-title>

          <v-card-text>
            <v-container>
              <v-row justify="center">
                <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
                  <div class="text-h5">Confirm</div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" outlined @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="red darken-1" @click="deleteItemConfirm"
              >Confirm</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="activities"
          class="elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <!-- <v-btn color="primary" @click="initialize"> Reset </v-btn> -->
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
import { getJwtToken } from "@/utils/auth";

export default {
  data: () => ({
  loggedIn: false,    
  jwtToken: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Users",
        align: "start",
        sortable: false,
        value: "name",
      },

      { text: "Actions", value: "actions", sortable: false },
    ],
    activities: [],
    editedIndex: -1,
    editedItem: {
      name: "",
    },
    defaultItem: {
      name: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Create" : "Edit";
    },
  },

  created() {
    this.loggedIn = this.$auth.loggedIn;

    this.initialize();
    // this.initialize();
  },

  // async asyncData({ app }) {
  //   // Fetch the token and set it in the axios defaults headers.
  //   const jwtToken = getJwtToken();
  //   if (jwtToken) {
  //     app.$axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  //   }

  //   // Fetch your activities data here and return it.
  //   const activities = await app.$axios.$get('/activity');
  //   return { activities };
  // },

  methods: {
    initialize() {
      this.activities = [
        {
          name: "Activity 1",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.activities.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.activities.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      //   this.activities.splice(this.editedIndex, 1);
      this.deleteActivity(this.editedItem._id);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.updateActivity();
        // Object.assign(this.activities[this.editedIndex], this.editedItem);
      } else {
        // this.activities.push(this.editedItem);
        this.handleSubmitForm();
      }
      //   this.fetch_activities();
      this.close();
    },

    async fetch_activities() {
      const apiURL = "/activity";

      try {
        const res = await this.$axios.$get(apiURL);
        this.activities = res;
        console.log(this.activities);
        console.log("Done");
      } catch (error) {
        console.log(error);
      }
    },

    handleSubmitForm() {
      const apiURL = "/activity/create-activity";

      this.$axios
        .$post(apiURL, this.editedItem)
        .then((res) => {
          this.fetch_activities();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async updateActivity() {
      const apiURL = `/activity/update-activity/${this.editedItem._id}`;

      try {
        await this.$axios.$put(apiURL, { name: this.editedItem.name });
        console.log("Activity updated successfully");
        this.fetch_activities();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteActivity(id) {
      const apiURL = `/activity/delete-activity/${id}`;

      try {
        await this.$axios.$delete(apiURL);
        console.log("Activity deleted successfully");
        this.fetch_activities();
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push("/");
    },
    async test_something()
    {
      try {
        await this.$axios.$get("/test");
        console.log("test deleted successfully");
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>
