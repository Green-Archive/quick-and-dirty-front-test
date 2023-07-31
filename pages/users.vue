<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="items" class="elevation-1">
          <template v-slot:top>
            <v-toolbar color="pink" flat>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    <v-icon left> mdi-plus </v-icon>

                    Add
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="blue">
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <!-- use the schema at here -->
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.username"
                            label="Username Field"
                          ></v-text-field>

                          <v-text-field
                            v-model="editedItem.password"
                            label="Password Field"
                            type="password"
                          ></v-text-field>

                          <v-text-field
                            v-model="editedItem.citizenId"
                            label="Citizen ID Field"
                          ></v-text-field>

                          <v-text-field
                            v-model="editedItem.name"
                            label="Name Field"
                          ></v-text-field>

                          <v-text-field
                            v-model="editedItem.nickname"
                            label="Nickname Field"
                          ></v-text-field>

                          <v-text-field
                            v-model="editedItem.phoneNumber"
                            label="Phone Number Field"
                            type="tel"
                          ></v-text-field>

                          <v-text-field
                            v-model="editedItem.dateOfBirth"
                            label="Date Of Birth Field"
                            type="date"
                          ></v-text-field>

                          <v-select
                            v-model="editedItem.gender"
                            :items="gender"
                            label="Select User"
                            required
                          ></v-select>

                          <v-text-field
                            v-model="editedItem.district"
                            label="District Field"
                          ></v-text-field>

                          <v-text-field
                            v-model="editedItem.subDistrict"
                            label="Subdistrict Field"
                          ></v-text-field>

                          <v-text-field
                            v-model="editedItem.ethnicID"
                            label="Ethnic ID Field"
                          ></v-text-field>

                          <v-text-field
                            v-model="editedItem.language"
                            label="Language Field"
                          ></v-text-field>

                          <v-text-field
                            v-model="editedItem.email"
                            label="Email Field"
                            type="email"
                          ></v-text-field>

                          <v-select
                            v-model="editedItem.role"
                            :items="role"
                            label="Select User"
                            required
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions class="d-flex justify-center">
                    <v-btn color="blue darken-1" outlined @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" @click="signUp">Confirm</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.dateOfBirth`]="{ item }">
            <!-- Format the dateTime using Moment.js in the table cell -->
            {{ $moment(item.dateTime).format("DD-MM-YYYY") }}
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
import { DialogMixin } from "@/mixins/DialogMixin";
import { users_api } from "@/mixins/usersMixin";
import { APIMixin } from "@/mixins/APIMixin";

export default {
  layout: "default",
  mixins: [users_api, APIMixin, DialogMixin],

  data() {
    return {};
  },
  methods: {
    async signUp() {
      const apiURL = `/auth/signup`;
      try {
        const res = await this.$axios.$post(apiURL, this.editedItem);
        this.$notifier.showMessage({ content: res.message, color: "green" });
        this.$fetch();
        this.close();
      } catch (error) {
        this.error_handler(error);
      }
    },
  },
};
</script>
