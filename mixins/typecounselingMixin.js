// APIMixin.js
const base_url_api = "/typecounselings";

const base_headers = [
  { text: "Ethnic", align: "start", sortable: false, value: "name" },
  { text: "Actions", value: "actions", sortable: false },
];

// it's a payload, you can change it to your own
const base_schema = {
  name: "",
};

const base_data = {
  items: [],
  editedItem: base_schema,
  defaultItem: base_schema,
  headers: base_headers,
};

export const APIMixin = {
  data() {
    return base_data;
  },
  async fetch() {
    try {
      const response = await this.$axios.$get(`${base_url_api}`);
      this.items = response.response;
    } catch (error) {
      this.error_handler(error);
    }
  },
  methods: {
    async deleteAPI(id) {
      const apiURL = `${base_url_api}/${id}`;
      try {
        const res = await this.$axios.$delete(apiURL);
        this.$notifier.showMessage({ content: res.message, color: "red" });
        this.$fetch();
      } catch (error) {
        this.error_handler(error);
      }
    },
    async updateAPI() {
      const apiURL = `${base_url_api}/${this.editedItem._id}`;
      try {
        const res = await this.$axios.$put(apiURL, {
          name: this.editedItem.name,
        });
        this.$notifier.showMessage({ content: res.message, color: "blue" });
        this.$fetch();
      } catch (error) {
        this.error_handler(error);
      }
    },
    async createAPI() {
      const apiURL = `${base_url_api}`;
      try {
        const res = await this.$axios.$post(apiURL, this.editedItem);
        this.$notifier.showMessage({ content: res.message, color: "green" });
        this.$fetch();
      } catch (error) {
        this.error_handler(error);
      }
    },

    error_handler(error) {
      if (error.response === undefined) {
        console.log("error.response = ", error.response);
        this.$notifier.showMessage({
          content: error.message,
          color: "red",
        });
      } else if (error.response.data.error !== undefined) {
        console.log("error.response.error = ", error.response.data.error);
        this.$notifier.showMessage({
          content: error.response.data.error,
          color: "red",
        });
      } else {
        console.log("error.response.message = ", error.response.data.message);
        this.$notifier.showMessage({
          content: error.response.data.message,
          color: "red",
        });
      }
    },
  },
};
