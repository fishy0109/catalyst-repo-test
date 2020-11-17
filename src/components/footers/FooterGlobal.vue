<template>
  <footer id="cat-footer">

    <div class="cat-footer">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-8 offset-lg-2">
            <div class="row">
              <div class="col-md-5 offset-md-1 col-sm-6 cat-footer-sitems">
                <a
                  class="cat-footer-sitems-link text-center"
                  :href="socialLink"
                >
                  <div class="footer-icons text-large d-flex">

                    <i class="fab fa-twitter"></i>
                    <i class="fab fa-linkedin-in"></i>
                    <i class="far fa-envelope"></i>
                    <i class="fab fa-github"></i>
                  </div>

                  <div class="mt-1 font-family1 weight-bold">
                    <span>Connect With Us</span>
                  </div>
                </a>
              </div>

              <div
                class="col-md-5 col-sm-6 cat-footer-address d-flex align-items-center justify-content-center"
              >
                <span
                  class="font-family1 weight-semi text-center text-small"
                  >Suite 903, 821 Pacific Highway Chatswood NSW 2067
                  <span class="d-block">ABN 29 130 788 171</span></span>
              </div>
            </div>

            <div class="row" v-if="compFooterItems.length > 0">
              <div class="cat-footer-menu col-md-12 col-sm-8 mx-auto">
                <footer-menu-item
                  :footer-items="compFooterItems"
                ></footer-menu-item>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div class="cat-footer-bottom">
              <div class="cat-footer-bl my-auto">
                <span>Copyright © 2019–2020 Catalyst IT Australia. All Rights Reserved</span>
              </div>

              <div class="cat-footer-br">
                <img src="../../assets/images/catalyst-logo.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import FooterMenuItem from "@/components/footers/FooterMenuItem";

export default {
  name: "FooterGlobal",

  data() {
    return {
      compFooterItems: [
              {
        "title": "Contact us",
        "link": "http://defence.gov.au/"
      },
      {
        "title": "Copyright",
        "link": "http://defence.gov.au/"
      },
      {
        "title": "Disclaimer",
        "link": "http://defence.gov.au/"
      },
      {
        "title": "Privacy",
        "link": "http://defence.gov.au/"
      },
      {
        "title": "Accessibility",
        "link": "http://defence.gov.au/"
      },
      {
        "title": "Sitemap",
        "link": "http://defence.gov.au/"
      },
      {
        "title": "Feedback",
        "isFeedback": true,
        "link": "http://defence.gov.au/"
      }

      ]
    };
  },

  props: {
    socialLink: {
      type: String,
      default: ""
    }
  },

  components: {
    FooterMenuItem
  }
};
</script>
