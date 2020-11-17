<template>
  <div>
    <div class="cat-nav-global">
      <div class="cat-nav-global-inner">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div class="row">
                <div class="col cat-nav-global-logo">
                  <a :href="nzLink" v-if="nzLink">
                    <span class="cat-nav-global-logo-inner">
                      <span class="cat-nav-global-logo-default">
                        New Zealand
                      </span>
                      <span class="cat-nav-global-logo-hover">
                        New Zealand
                        <i class="fas fa-arrow-right"></i>
                      </span>
                    </span>
                  </a>

                  <a :href="auLink" v-if="auLink">
                    <span class="cat-nav-global-logo-inner">
                      <span class="cat-nav-global-logo-default">
                        Australia
                      </span>
                      <span class="cat-nav-global-logo-hover">
                        Australia
                        <i class="fas fa-arrow-right"></i>
                      </span>
                    </span>
                  </a>

                  <a :href="ukLink" v-if="ukLink">
                    <span class="cat-nav-global-logo-inner">
                      <span class="cat-nav-global-logo-default">
                        UK
                      </span>
                      <span class="cat-nav-global-logo-hover">
                        UK
                        <i class="fas fa-arrow-right"></i>
                      </span>
                    </span>
                  </a>

                  <a :href="caLink" v-if="caLink">
                    <span class="cat-nav-global-logo-inner">
                      <span class="cat-nav-global-logo-default">
                        Canada
                      </span>
                      <span class="cat-nav-global-logo-hover">
                        Canada
                        <i class="fas fa-arrow-right"></i>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div class="col-md-3"></div>
          </div>
        </div>
      </div>

      <div
        class="cat-header-mobile-menus-wrap nav-global"
        :class="{
          'nav-open': showSlideMenu || showSearchMenu
        }"
      >
        <!-- MAIN NAV TRIGGER -->
        <a
          href="#"
          class="cat-header-mob-trigger left"
          @click.prevent="showSlideMenuToggle"
          :class="{ open: showSlideMenu }"
        >
          <span class="cat-header-mob-trigger-icon">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span class="cat-header-mob-trigger-text">Main menu</span>
        </a>

        <!-- SEARCH NAV TRIGGER -->
        <a
          href="#"
          class="cat-header-mob-trigger"
          :class="{ open: showSearchMenu }"
          @click.prevent="showSlideSearchToggle"
          v-if="hasSearch"
        >
          <span class="cat-header-mob-trigger-text">Search</span>
          <span class="cat-header-mob-trigger-icon">
            <i class="far fa-times icon-close"></i>
            <i class="far fa-search icon-search"></i>
          </span>
        </a>

        <!-- MAIN NAV -->
        <div
          class="cat-header-mob-nav nav-global"
          :class="{
            'nav-open': showSlideMenu,
            'visibility-hidden': !showSlideMenu
          }"
        >
          <header>
            <div class="cat-header-mob-header-inner"></div>
          </header>

          <!-- PRIMARY NAV -->
          <div
            class="inner mob-nav-primary"
            :class="{
              'mob-nav-primary-active': showSlideMenu
            }"
          >
            <div class="overflow-nav">
              <nav>
                <ul>
                  <li v-for="(item, index) in compItems" :key="index">
                    <a :href="item.link">{{ item.title }}</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <!-- SEARCH -->
        <div class="cat-nav-global-search" v-if="hasSearch">
          <div
            class="slide-search-nav"
            :class="{
              'nav-open': showSearchMenu,
              'visibility-hidden': !showSearchMenu
            }"
          >
            <header>
              <div class="cat-nav-global-search-header-inner"></div>
            </header>
            <div class="inner">
              <h3 class="mb-2">Search</h3>

              <form
                class="form-group"
                @submit.prevent="submitForm"
                :form-method="formMethod"
                ref="searchForm"
                :action="formTargetUrl"
                id="DefNavigationGlobalSearch"
              >
                <label>What would you like to search?</label>

                <div class="select">
                  <div class="select__arrow"></div>
                </div>

                <div class="input-group">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search by keyword of phrase"
                    class="form-control animate-fade-in"
                    v-model="formSearch"
                    :class="{ 'is-invalid': !minCharReached }"
                    id="DefNavigationGlobalSearchInput"
                  />
                  <div
                    class="global-feedback-msg invalid-feedback bg-cat-dark-grey-1 mt-0"
                  >
                    Search must be at least {{ formMinChar }} characters long.
                  </div>
                </div>
                <div class="cat-nav-global-search-btn">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    id="DefNavigationGlobalSearchSubmit"
                  >
                    <span>Search</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="cat-nav-overlay"
      @click.prevent="closeAllMenus"
      :class="{ 'show-overlay': showSlideMenu || showSearchMenu }"
    ></div>
  </div>
</template>

<script>
import { formSearch } from "@/mixins/Search";

export default {
  name: "OrganismNavigationGlobal",

  mixins: [formSearch],

  data() {
    return {
      compItems: [],
      isActiveMinisters: false,
      isActiveNavy: false,
      isActiveArmy: false,
      isActiveAF: false,
      showSlideMenu: false,
      showSearchMenu: false,
      searchMenuTransitionFinished: false,
      mainMenuTransitionFinished: false
    };
  },

  props: {
    hasSearch: {
      type: Boolean,
      default: true
    },

    items: {
      type: Array,
      default: function() {
        return [];
      }
    },

    nzLink: {
      type: String,
      default: "http://www.catalyst.net.nz/"
    },

    auLink: {
      type: String,
      default: "/"
    },

    ukLink: {
      type: String,
      default: "http://www.catalyst-eu.net/"
    },

    caLink: {
      type: String,
      default: "http://catalyst-ca.net/"
    }
  },

  methods: {
    showSlideMenuToggle() {
      if (this.showSlideMenu === true) {
        this.closeSlideMenu();
      } else {
        this.showSearchMenu = false;
        this.showSlideMenu = true;
        this.mainMenuTransitionFinished = true;

        // delay the zindex changing so icon animation can happen
        setTimeout(() => {
          this.searchMenuTransitionFinished = false;
        }, 100);
      }
    },

    showSlideSearchToggle() {
      if (this.showSearchMenu === true) {
        this.closeSearchMenu();
      } else {
        this.showSlideMenu = false;
        // delay the zindex changing so icon animation can happen
        setTimeout(() => {
          this.mainMenuTransitionFinished = false;
        }, 200);

        this.showSearchMenu = true;
        this.searchMenuTransitionFinished = true;
      }
    },

    closeSlideMenu() {
      // close mob menu
      this.showSlideMenu = false;
      // delay the zindex changing so icon animation can happen
      setTimeout(() => {
        this.mainMenuTransitionFinished = false;
      }, 200);
    },

    closeSearchMenu() {
      // close mob menu
      this.showSearchMenu = false;

      // delay the zindex changing so icon animation can happen
      setTimeout(() => {
        this.searchMenuTransitionFinished = false;
      }, 100);

      // make sure menu closed before reseting it all
      setTimeout(() => {
        this.showSlideMenu = false;
      }, 500);
    },

    closeAllMenus() {
      this.closeSlideMenu();
      this.closeSearchMenu();
    }
  }
};
</script>
