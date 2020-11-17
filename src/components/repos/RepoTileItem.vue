<template>
  <a :href="link" class="cat-repo-item">
    <div class="row w-100">
      <div class="col-lg-8">
        <div class="cat-repo-item-inner">
          <div class="row">
            <div class="cat-section-header d-flex align-items-center col">
              <h4><span v-if="fork"><i class="fal fa-copy"></i></span>{{ title }}</h4>
              <span class="cat-repo-lang" :class="langColour">{{ language }}</span>
            </div>
            <div class="cat-repo-contrib">
              <span v-for="(contrib, index) in contribItems" :key="index">
                <a :href="contrib.html_url">
                  <img :src="contrib.avatar_url" />
                </a>
              </span>
            </div>
          </div>
          <p>{{ description }}</p>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="cat-repo-item-info">
          <ul>
            <li v-if="time">
              <i class="fal fa-clock"></i>
              {{ time | timeReset() }}
            </li>

            <li>
              <i class="fal fa-eye"></i>
              Watch <span class="count">{{ watchCount }}</span>
            </li>

            <li>
              <i class="fal fa-star"></i>
              Star <span class="count">{{ starCount }}</span>
            </li>

            <li>
              <i class="fal fa-code-branch"></i>
              Fork <span class="count">{{ forkCount }}</span>
            </li>

            <li v-if="license">
              <i class="fal fa-file-certificate"></i>
              {{ license.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </a>
</template>

<script>

export default {
  name: "RepoTileItem",

  data() {
    return {
      contribItems: []
    }
  },

  props: {
    title: {
      type: String,
      default: ""
    },

    fork: {
      type: Boolean,
      default: false
    },

    link: {
      type: String,
      default: ""
    },

    language: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
    },

    time: {
      type: String,
      default: ""
    },

    watchCount: {
      type: Number,
      default: 0
    },

    starCount: {
      type: Number,
      default: 0
    },

    forkCount: {
      type: Number,
      default: 0
    },

    license: {
      type: Object,
      default: function() {
        return {}
      }
    },

    contributors: {
      type: String,
      default: ""
    }
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
  },

  created() {
    this.$axios
      .get(this.contributors)
      .then(res => {
        this.contribItems = res.data.slice(0, 5);
      })
  }
};
</script>
