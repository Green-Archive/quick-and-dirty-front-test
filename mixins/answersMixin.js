// APIMixin.js
const base_url_api = "/v1/answers";

const base_headers = [
  { text: "Text", align: "start", sortable: false, value: "text" },
  { text: "Actions", value: "actions", sortable: false },
];

// it's a payload, you can change it to your own
const base_schema = {
  formID: "",
  questionID: "",
  score: null,
  text: "",
};

// can't be the same because it will be bug
const default_schema = {
  formID: "",
  questionID: "",
  score: null,
  text: "",
};

const base_data = {
  base_url_api: base_url_api,
  items: [],
  editedItem: base_schema,
  defaultItem: default_schema,
  headers: base_headers,

  forms: [],
  selected_form: "",
  questions: [],
  selected_question: "",
};

export const answers_api = {
  data() {
    return base_data;
  },

  methods: {
    async createAPI() {
      const apiURL = `${this.base_url_api}`;
      try {
        const res = await this.$axios.$post(apiURL, {
          formID: this.selected_form,
          questionID: this.selected_question,
          score: this.editedItem.score,
          text: this.editedItem.text,
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
          formID: this.selected_form,
          questionID: this.selected_question,
          score: this.editedItem.score,
          text: this.editedItem.text,
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

      const response_form = await this.$axios.$get(`/questionforms`);
      this.forms = response_form.response;

      const response_question = await this.$axios.$get(`/questions`);
      this.questions = response_question.response;
    } catch (error) {
      this.error_handler(error);
    }
  },
};
