<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="districts" class="elevation-1">
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
  middleware: "auth",

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
        value: "districtEng",
      },

      { text: "Actions", value: "actions", sortable: false },
    ],
    activities: [],
    districts: [],
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
    this.jwtToken = this.$auth.strategy.token.get();
  },

  async fetch() {
    const res = await await this.$axios.$get("/district");
    if (!res) {
      // this.$router.replace(this.replace);
      console.log("kim");
    } else {
      this.districts = res.response;
    }
  },

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
    async test_something() {
      try {
        console.log(this.jwtToken);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
