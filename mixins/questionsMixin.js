// APIMixin.js
const base_url_api = "/answers";

const base_headers = [
  { text: "Form ID", value: "formID.title" },
  { text: "Question ID", value: "questionID.text" },
  { text: "Score", value: "score" },
  { text: "Text", value: "text" },
];

// it's a payload, you can change it to your own
const base_schema = {
  text: "",
};

// can't be the same because it will be bug
const default_schema = {
  text: "",
};

const base_data = {
  base_url_api: base_url_api,
  items: [],
  editedItem: base_schema,
  defaultItem: default_schema,
  headers: base_headers,
  groupByField: "formID._id",
};

export const questions_api = {
  data() {
    return base_data;
  },

  computed: {
    groupedAnswers() {
      // Group the answers by the specified field (formID in this case)
      const grouped = this.answers.reduce((acc, answer) => {
        const key = answer[this.groupByField].toString();
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(answer);
        return acc;
      }, {});
      // Convert the grouped object to an array of groups
      return Object.entries(grouped).map(([key, items]) => ({
        groupBy: key,
        items,
      }));
    },
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
