<template>
  <div class="cat-header-logo-title">
    <div class="cat-header-inner">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <a href="/" class="cat-logo">
              <img src="../../assets/images/catalyst-logo.png" />
            </a>
          </div>

          <div class="col-lg-8">
            <span class="h3 page-name">{{ headerTitle }}</span>
          </div>
        </div>
      </div>
    </div>

    <a @click.prevent="scrollToTop()" href="#" class="scroll-to-top">
      <i class="fa fa-chevron-up"></i>
      <span class="sr-only">Scroll to top</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "HeaderLogoSectionTitle",

  data() {
    return {
      showMobMenu: false
    };
  },

  props: {
    headerTitle: {
      type: String,
      default: "Expert open source solutions"
    },

    logoLink: {
      type: String,
      default: "http://www.defence.gov.au/"
    }
  },

  created() {
    // listen for call from application container containing showMobMenu status
    this.$parent.$on("show-mobile-menu-header", menuStatus => {
      this.showMobMenu = menuStatus;
    });
  },

  methods: {
    scrollToTop(e) {
      const target = document.getElementById("cat-header");
      if (target != undefined) {
        target.scrollIntoView({
          block: "start",
          behavior: "smooth"
        });
        history.pushState(null, null, e);
      }
    }
  }
};
</script>
