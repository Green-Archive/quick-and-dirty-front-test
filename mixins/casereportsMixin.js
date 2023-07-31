const base_url_api = "/casereports";

const base_headers = [
  { text: "ID", align: "start", sortable: false, value: "_id" },
  { text: "Address", sortable: false, value: "note" },
  { text: "Contact", sortable: false, value: "level" },
  { text: "Contact", sortable: false, value: "record" },

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

  appointmentID: [],
};

export const case_report_api = {
  data() {
    return base_data;
  },
};
