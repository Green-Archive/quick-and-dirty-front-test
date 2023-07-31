const base_url_api = "/counselors";

const base_headers = [
  { text: "Name", align: "start", sortable: false, value: "user.name" },
  { text: "Specializations", sortable: false, value: "specializations" },
  { text: "Detail", sortable: false, value: "detail" },
  // { text: "Contact", sortable: false, value: "record" },
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

export const counselors_api = {
  data() {
    return base_data;
  },
};
