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

const base_data = {
  base_url_api: base_url_api,
  items: [],
  editedItem: base_schema,
  defaultItem: base_schema,
  headers: base_headers,
};

export const case_report_api = {
  data() {
    return base_data;
  },
};
