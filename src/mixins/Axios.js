import axios from "axios";

export const axiosData = {
  data() {
    return {
      renderResults: false,
      renderResultsCount: 1
    };
  },

  methods: {
    axiosRequest(first) {
      const config = typeof first.api !== "undefined" ? first.api : null;
      const seek =
        typeof first.response !== "undefined" ? first.response : "data";

      return axios(config)
        .then(response => {
          return seek
            ? seek.split(".").reduce((o, i) => o[i], response)
            : response;
        })
        .then(reduced => {
          return typeof reduced !== "object" ? [{ result: reduced }] : reduced;
        })
        .then(results => {
          if (results.length > 0) {
            this.renderResults = true;
            // console.log("results", results)
            return results;
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
