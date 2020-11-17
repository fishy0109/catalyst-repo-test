<template>
  <div class="cat-card-item">
    <a class="card cat-card cat-card--repo" :href="url" target="_blank">

      <div class="card-body">
        <div class="row">
          <div class="col d-flex align-items-center justify-content-between">
            <h6 class="cat-repo-time"><i class="fal fa-clock"></i>{{ time | timeReset() }}</h6>
            <span class="cat-repo-lang" :class="langColour">{{ language }}</span>
          </div>
        </div>

        <h5 v-if="title"><span v-if="fork"><i class="fal fa-copy"></i></span>{{ title }}</h5>
        <p class="cat-repo-desc">
          {{ description }}
        </p>

      </div>

      <div class="card-footer">
        <span class="repo-star"><i class="fal fa-star"></i>{{ starCount }}</span>
        <span class="repo-watch"><i class="fal fa-eye"></i>{{ watchCount }}</span>
        <span class="repo-fork"><i class="fal fa-code-branch"></i>{{ forkCount }}</span>
      </div>

    </a>
  </div>
</template>

<script>

export default {
  name: "RepoCard",

  props: {
    url: {
      type: String,
      default: ""
    },

    fork: {
      type: Boolean,
      default: false
    },

    time: {
      type: String,
      default: ""
    },

    language: {
      type: String,
      default: ""
    },

    title: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
    },

    starCount: {
      type: Number,
      default: 0
    },

    watchCount: {
      type: Number,
      default: 0
    },

    forkCount: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {};
  },

  computed: {
    langColour() {
      return `cat-repo-lang-${this.language}`;
    }
  },

  filters: {
    timeReset: function(value) {
      return value.split("T")[0];
    }
  }
};
</script>
