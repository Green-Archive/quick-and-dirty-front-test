// APIMixin.js
const base_url_api = "/ethnics";

const base_headers = [
  { text: "Ethnic", align: "start", sortable: false, value: "name" },
  { text: "Actions", value: "actions", sortable: false },
];

const base_data = {
  items: [],
  editedItem: { name: "" },
  defaultItem: { name: "" },
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
      console.log(error);
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
        console.log(error);
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
        console.log(error);
      }
    },
    async createAPI() {
      const apiURL = `${base_url_api}`;
      try {
        const res = await this.$axios.$post(apiURL, this.editedItem);
        this.$notifier.showMessage({ content: res.message, color: "green" });
        this.$fetch();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
