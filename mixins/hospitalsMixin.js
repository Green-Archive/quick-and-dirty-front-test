// APIMixin.js
const base_url_api = "/hospitals";

const base_headers = [
  { text: "Hospitals", align: "start", sortable: false, value: "name" },
  { text: "Address", sortable: false, value: "address" },
  { text: "Contact", sortable: false, value: "contact" },

  { text: "Actions", value: "actions", sortable: false },
];

// it's a payload, you can change it to your own
const base_schema = {
  name: "",
  address: "",
  contact: [],
};

// can't be the same because it will be bug
const default_schema = {
  name: "",
  address: "",
  contact: [],
};

const base_data = {
  base_url_api: base_url_api,
  items: [],
  editedItem: base_schema,
  defaultItem: default_schema,
  headers: base_headers,
};

export const hospitals_api = {
  data() {
    return base_data;
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
