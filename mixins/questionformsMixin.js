// APIMixin.js
const base_url_api = "/v1/questionforms";

const base_headers = [
  { text: "Title", align: "start", sortable: false, value: "title" },
  { text: "Description", value: "description", sortable: false },
  { text: "Actions", value: "actions", sortable: false },
  // { text: "", value: "data-table-expand", sortable: false },
];

// it's a payload, you can change it to your own
const base_schema = {
  title: "",
  description: "",
};

// can't be the same because it will be bug
const default_schema = {
  title: "",
  description: "",
};

const base_data = {
  expanded: [],
  base_url_api: base_url_api,
  items: [],
  editedItem: base_schema,
  defaultItem: default_schema,
  headers: base_headers,
};

export const questionforms_api = {
  data() {
    return base_data;
  },

  methods: {
    async createAPI() {
      const apiURL = `${this.base_url_api}`;
      try {
        const res = await this.$axios.$post(apiURL, this.editedItem);
        this.$notifier.showMessage({ content: res.message, color: "green" });
        this.$fetch();
      } catch (error) {
        this.error_handler(error);
      }
    },

    async updateAPI() {
      const apiURL = `${this.base_url_api}/${this.editedItem._id}`;
      try {
        const res = await this.$axios.$put(apiURL, this.editedItem);
        this.$notifier.showMessage({ content: res.message, color: "blue" });
        this.$fetch();
      } catch (error) {
        this.error_handler(error);
      }
    },
  },

  async fetch() {
    try {
      const response = await this.$axios.$get(`${this.base_url_api}`);
      this.items = response.response;
    } catch (error) {
      this.error_handler(error);
    }
  },
};
