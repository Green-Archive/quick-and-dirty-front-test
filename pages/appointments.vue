<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="appointments"
          class="elevation-1"
        >
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
            <!-- <v-progress-linear
              indeterminate
              rounded
              height="6"
            ></v-progress-linear> -->
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-form class="mt-10 mb-5" @submit.prevent="appointment">
      <v-row justify="center" align="center">
        <v-col cols="7">
          <v-select
            v-model="selectedUser"
            :items="users"
            item-text="username"
            item-value="_id"
            label="Select User"
            required
          ></v-select>

          <v-select
            v-model="selectedCounselor"
            :items="counselors"
            item-text="user.name"
            item-value="_id"
            label="Select Counselor"
            required
          ></v-select>

          <date-picker v-model="dateTime" type="datetime"></date-picker>
        </v-col>
      </v-row>

      <v-row justify="center" align="center">
        <v-col cols="7">
          <v-btn type="submit" color="primary">Create Appointment</v-btn>

          <v-btn @click="test_appointment" color="green" dark class="mx-2">
            Test
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>


<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: {
    DatePicker,
  },

  layout: "default",
  data() {
    return {
      appointments: [],
      loggedIn: false,
      users: [],
      counselors: [],

      dialog: false,
      dialogDelete: false,

      selectedCounselor: null,
      selectedUser: null,

      headers: [
        {
          text: "Users",
          align: "start",
          sortable: false,
          value: "user.name",
        },
        { text: "Counselors", value: "counselor.user.name", sortable: false },
        { text: "Date Time", value: "dateTime", sortable: false },

        { text: "Actions", value: "actions", sortable: false },
      ],
      dateTime: null,
    };
  },

  async fetch() {
    const users = await this.$axios.$get("/users");
    const counselors = await this.$axios.$get("/counselors");
    const appointments = await this.$axios.$get("/appointments");

    if (!users || !counselors) {
      console.log("something wrong");
    } else {
      this.users = users.response;
      this.counselors = counselors.response;
      this.appointments = appointments.response;
    }
  },

  created() {
    this.loggedIn = this.$auth.loggedIn;
  },

  methods: {
    async appointment() {
      const apiURL = "/appointments";
      try {
        const res = await this.$axios.$post(apiURL, {
          user: this.selectedUser,
          counselor: this.selectedCounselor,
          dateTime: this.dateTime,
        });
        console.log(res);
        this.$fetch();
      } catch (err) {
        console.log(err);
      }
    },

    test_appointment() {
      console.log(this.selectedUser);
      console.log(this.selectedCounselor);
      console.log(this.dateTime);
    },

    async logout() {
      await this.$auth.logout();
      window.location.reload(true);
    },
  },
};
</script>
