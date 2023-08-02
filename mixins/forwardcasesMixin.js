// APIMixin.js
const base_url_api = "/forwardcases";

const base_headers = [
  { text: "Forward Case ID", align: "start", sortable: false, value: "_id" },
  { text: "Hospital", value: "actions", sortable: false },

  { text: "Actions", value: "actions", sortable: false },
];

// it's a payload, you can change it to your own
const base_schema = {
  caseID: null,
  hospitalID: null,
  appointmentID: null,
};

// can't be the same because it will be bug
const default_schema = {
  caseID: null,
  selected_hospital: null,
  appointmentID: null,
};

const base_data = {
  base_url_api: base_url_api,
  items: [],
  editedItem: base_schema,
  defaultItem: default_schema,
  headers: base_headers,

  casereports: [],
  selected_casereport: null,
  hospitals: [],
  selected_hospital: null,
  appointments: [],
  selected_appointment: null,
};

export const forwardcases_api = {
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
