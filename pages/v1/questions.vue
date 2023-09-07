<template>
  <v-container fluid class="pa-0 mb-5">
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="items"
          :group-by="groupByField"
          :group-desc="false"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar color="pink" flat>
              <v-spacer></v-spacer>

              <v-btn @click="test_something" color="green" class="mx-2" dark>
                Test
              </v-btn>

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
                            v-model="editedItem.text"
                            label="Text Field"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions class="d-flex justify-center">
                    <v-btn color="blue darken-1" outlined @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" @click="save">Confirm</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <!-- use the base_headers at here -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-col>
    </v-row>
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
          <v-btn color="red darken-1" @click="deleteItemConfirm">Confirm</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { DialogMixin } from "@/mixins/DialogMixin";
import { APIMixin } from "~/mixins/APIMixin";
import { questions_api } from "@/mixins/questionsMixin";

export default {
  layout: "default",
  mixins: [DialogMixin, APIMixin, questions_api],
  data() {
    return {};
  },

  methods: {
    test_something() {
      this.$notifier.showMessage({ content: "Hello, snackbar", color: "info" });
    },
  },
};
</script>
