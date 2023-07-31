// APIMixin.js
const base_url_api = "/typecounselings";

const base_headers = [
  { text: "TypeCounselings", align: "start", sortable: false, value: "name" },
  { text: "Actions", value: "actions", sortable: false },
];

// it's a payload, you can change it to your own
const base_schema = {
  name: "",
};

const base_data = {
  base_url_api: base_url_api,
  items: [],
  editedItem: base_schema,
  defaultItem: base_schema,
  headers: base_headers,
};

export const typecounselings_api = {
  data() {
    return base_data;
  },
};