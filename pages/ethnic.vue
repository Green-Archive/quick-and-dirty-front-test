<template>
  <v-container fluid class="pa-0 mb-5">
    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="ethnics" class="elevation-1">
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
                    <v-btn color="blue darken-1" outlined @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" @click="save">Confirm</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

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
export default {
  layout: "default",
  data() {
    return {
      ethnics: [],

      dialog: false,
      dialogDelete: false,

      selectedCounselor: null,
      selectedUser: null,

      editedIndex: -1,
      dateTime: null,

      editedItem: {
        name: "",
      },
      defaultItem: {
        name: "",
      },

      headers: [
        {
          text: "Ethnic",
          align: "start",
          sortable: false,
          value: "name",
        },

        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  async fetch() {
    const ethnics = await this.$axios.$get("/ethnics");

    if (!ethnics) {
      console.log("something wrong");
    } else {
      this.ethnics = ethnics.response;
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Create" : "Edit";
    },
  },

  created() {},

  methods: {
    test_something() {
      this.$notifier.showMessage({ content: "Hello, snackbar", color: "info" });
    },

    editItem(item) {
      this.editedIndex = this.ethnics.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$notifier.showMessage({ content: item, color: "black" });
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.ethnics.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$notifier.showMessage({ content: this.editedIndex, color: "black" });
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteEthnic(this.editedItem._id);
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

    async logout() {
      await this.$auth.logout();
      window.location.reload(true);
    },
    async deleteEthnic(id) {
      const apiURL = `/ethnics/${id}`;

      try {
        const res = await this.$axios.$delete(apiURL);
        this.$notifier.showMessage({
          content: res.message,
          color: "red",
        });
        this.$fetch();
      } catch (error) {
        console.log(error);
      }
    },

    async updateEthnic() {
      const apiURL = `/ethnics/${this.editedItem._id}`;

      try {
        const res = await this.$axios.$put(apiURL, {
          name: this.editedItem.name,
        });
        this.$notifier.showMessage({
          content: res.message,
          color: "blue",
        });

        this.$fetch();
      } catch (error) {
        console.log(error);
      }
    },

    async createEthnic() {
      const apiURL = `/ethnics`;

      try {
        const res = await this.$axios.$post(apiURL, this.editedItem);
        this.$notifier.showMessage({
          content: res.message,
          color: "green",
        });

        this.$fetch();
      } catch (error) {
        console.log(error);
      }
    },

    save() {
      if (this.editedIndex > -1) {
        this.updateEthnic();
      } else {
        this.createEthnic();
      }

      this.close();
    },
  },
};
</script>
  