// APIMixin.js

export const APIMixin = {
  methods: {
    async deleteAPI(id) {
      const apiURL = `${this.base_url_api}/${id}`;
      try {
        const res = await this.$axios.$delete(apiURL);
        this.$notifier.showMessage({ content: res.message, color: "red" });
        this.$fetch();
      } catch (error) {
        this.error_handler(error);
      }
    },

    error_handler(error) {
      if (error.response === undefined) {
        console.log("error.response = ", error.response);
        this.$notifier.showMessage({
          content: error.message,
          color: "red",
        });
      } else if (error.response.data.error !== undefined) {
        console.log("error.response.error = ", error.response.data.error);
        this.$notifier.showMessage({
          content: error.response.data.error,
          color: "red",
        });
      } else {
        console.log("error.response.message = ", error.response.data.message);
        this.$notifier.showMessage({
          content: error.response.data.message,
          color: "red",
        });
      }
    },
  },
};
