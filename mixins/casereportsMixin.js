const base_url_api = "/casereports";

const base_headers = [
  // { text: "ID", align: "start", sortable: false, value: "_id" },
  // { text: "AppointmentID", sortable: false, value: "appointmentID._id" },
  {
    text: "Counselor",
    align: "start",
    sortable: false,
    value: "appointmentID.counselor.user.name",
  },
  { text: "User", sortable: false, value: "appointmentID.user.name" },
  { text: "User", sortable: false, value: "appointmentID.dateTime" },

  { text: "Note", sortable: false, value: "note" },
  { text: "Level", sortable: false, value: "level" },
  { text: "Record", sortable: false, value: "record" },

  { text: "Actions", value: "actions", sortable: false },
];

// it's a payload, you can change it to your own
const base_schema = {
  name: "",
  address: "",
  contact: [],
};

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

  selectedAppointment: null,
  appointments: [],
};

export const case_report_api = {
  data() {
    return base_data;
  },

  async fetch() {
    try {
      const response = await this.$axios.$get(`${this.base_url_api}`);
      const appointments = await this.$axios.$get("/appointments");
      this.appointments = appointments.response;
      this.items = response.response;
    } catch (error) {
      this.error_handler(error);
    }
  },
};
