export const formSearch = {
  data() {
    return {
      formSearch: "",
      formSelect: "all",
      submitClicked: false,
      minCharReached: true,
      domain: null,
      paramsToCheck: null,
    };
  },

  props: {
    formTargetUrl: {
      type: String,
      default: "/search",
    },

    formMethod: {
      type: String,
      default: "GET",
    },

    formQueryParam: {
      type: String,
      default: "q",
    },

    formCatParam: {
      type: String,
      default: "cat",
    },

    formExtraString: {
      type: String,
      default: "",
    },

    formMinChar: {
      type: Number,
      default: 3,
    },

    formAreaItems: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },

  watch: {
    formSearch() {
      // calc if validation should be triggered
      //
      if (this.submitClicked) {
        if (this.formSearch.length >= this.formMinChar) {
          this.minCharReached = true;
        } else {
          this.minCharReached = false;
        }
      }
    },
  },

  mounted() {
    this.checkURLforSearch();
  },

  methods: {
    submitForm: function(e) {
      this.submitClicked = true;

      // check formMinChar validation
      // then map params
      if (this.formSearch.length >= this.formMinChar) {
        const query = this.formQueryParam;
        const cat = this.formCatParam;
        const params = {
          [query]: this.formSearch.toLowerCase(),
          [cat]: this.formSelect.toLowerCase(),
        };

        // leave formExtraString from params if empty
        //
        if (this.formExtraString != "") {
          Object.assign(params, { e: this.formExtraString.toLowerCase() });
        }

        const queryString = Object.keys(params)
          .map((key) => {
            if (key === "e") {
              return params[key];
            } else {
              return encodeURI(key) + "=" + encodeURIComponent(params[key]);
            }
          })
          .join("&");

        const searchResult = `${this.formTargetUrl}?${queryString}`;

        // alert for testing search strings
        //
        // alert(searchResult);

        window.location.href = searchResult;
      } else {
        this.minCharReached = false;
      }
    },

    checkURLforSearch() {
      // check URL for search params
      //
      const currentURL = window.location.href;
      const query = this.formQueryParam;
      const cat = this.formCatParam;

      // strip out domian if found in currentURL
      //
      this.domain = currentURL.match(/^https?:\/\/(?:(?!q=)[^\n?=#])+\??/i);
      this.paramsToCheck = currentURL.replace(this.domain[0], "");

      const params = new URLSearchParams(this.paramsToCheck);

      // if params found check to see if they match default
      // populate text or select with search params
      for (const param of params) {
        if (param[0] === query) {
          this.formSearch = param[1];
        }

        if (param[0] === cat) {
          this.formSelect = param[1];
        }
      }
    },
  },
};
