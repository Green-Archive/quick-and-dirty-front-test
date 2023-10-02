// APIMixin.js
const base_url_api = "/v1/forwardcases";

const base_headers = [
  // { text: "Forward Case ID", align: "start", sortable: false, value: "_id" },
  { text: "Hospital", value: "hospitalID.name", sortable: false },
  {
    text: "Counselor",
    align: "start",
    sortable: false,
    value: "appointmentID.counselor.user.name",
  },
  { text: "User", sortable: false, value: "appointmentID.user.name" },
  { text: "Appointment", value: "appointmentID.dateTime", sortable: false },
  { text: "Case Report", value: "caseID", sortable: false },

  { text: "Actions", value: "actions", sortable: false },
];

// it's a payload, you can change it to your own
const base_schema = {
  caseID: "",
  hospitalID: "",
  appointmentID: "",
};

// can't be the same because it will be bug
const default_schema = {
  caseID: "",
  hospitalID: "",
  appointmentID: "",
};

const base_data = {
  base_url_api: base_url_api,
  items: [],
  editedItem: base_schema,
  defaultItem: default_schema,
  headers: base_headers,

  casereports: [],
  selected_casereport: "",
  hospitals: [],
  selected_hospital: "",
  appointments: [],
  selected_appointment: "",
};

export const forwardcases_api = {
  data() {
    return base_data;
  },

  methods: {
    async createAPI() {
      const apiURL = `${this.base_url_api}`;
      try {
        const res = await this.$axios.$post(apiURL, {
          caseID: this.selected_casereport,
          hospitalID: this.selected_hospital,
          appointmentID: this.selected_appointment,
        });
        this.$notifier.showMessage({ content: res.message, color: "green" });
        this.$fetch();
      } catch (error) {
        this.error_handler(error);
      }
    },

    async updateAPI() {
      const apiURL = `${this.base_url_api}/${this.editedItem._id}`;
      try {
        const res = await this.$axios.$put(apiURL, {
          caseID: this.selected_casereport,
          hospitalID: this.selected_hospital,
          appointmentID: this.selected_appointment,
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
      this.items = response.response;

      const hospitals = await this.$axios.$get(`/hospitals`);
      this.hospitals = hospitals.response;

      const appointments = await this.$axios.$get(`/appointments`);
      this.appointments = appointments.response;

      const casereports = await this.$axios.$get(`/casereports`);
      this.casereports = casereports.response;
    } catch (error) {
      this.error_handler(error);
    }
  },
};
