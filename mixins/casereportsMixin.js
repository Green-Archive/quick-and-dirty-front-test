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
  note: "",
  level: "",
  record: "",
  appointmentID: null,
};

const default_schema = {
  note: "",
  level: "",
  record: "",
  appointmentID: null,
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

  methods: {
    async createAPI() {
      const apiURL = `${this.base_url_api}`;
      try {
        const res = await this.$axios.$post(apiURL, {
          note: this.editedItem.note,
          level: this.editedItem.level,
          record: this.editedItem.record,
          appointmentID: this.selectedAppointment,
        });
        // this.$notifier.showMessage({ content: res.message, color: "green" });
        this.$notifier.showMessage({
          content: this.editedItem.note,
          color: "green",
        });
        this.$fetch();
      } catch (error) {
        this.error_handler(error);
      }
    },

    async updateAPI() {
      const apiURL = `${this.base_url_api}/${this.editedItem._id}`;
      try {
        const res = await this.$axios.$put(apiURL, {
          note: this.editedItem.note,
          level: this.editedItem.level,
          record: this.editedItem.record,
          appointmentID: this.selectedAppointment,
        });
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
      const appointments = await this.$axios.$get("/appointments");
      this.appointments = appointments.response;
      this.items = response.response;
    } catch (error) {
      this.error_handler(error);
    }
  },
};
