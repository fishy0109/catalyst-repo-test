<template>
  <div class="cat-bg-pattern">
    <div class="cat-container-collection-repo container pb-4">
      <div class="cat-card-repo-title pt-5 mb-3">
        <a :href="repoUrl">
          <h2 class="cat-section-header-text d-flex align-items-center justify-content-center"><i class="fab fa-github"></i>Repositories <span class="total">{{ totalCount }}</span></h2>
        </a>
      </div>
      <div class="row">
        <div
          v-for="(item, index) in compItems"
          :key="index"
          :class="{
            'col-xl-3 col-lg-4 col-md-6 collection-four-items': itemsPerRow === 4,
            'col-lg-4 col-md-6 collection-three-items': itemsPerRow === 3,
            'col-md-6 collection-two-items': itemsPerRow === 2,
            'col-lg-12 col-md-6 collection-one-item':
              itemsPerRow === 1 || itemsPerRow > 5
          }"
        >
          <template>
            <repo-card
            :time="item.updated_at"
            :fork="item.fork"
            :language="item.language"
            :title="item.name"
            :description="item.description"
            :url="item.html_url"
            :starCount="item.stargazers_count"
            :watchCount="item.watchers_count"
            :forkCount="item.forks_count"
            ></repo-card>
          </template>
        </div>
      </div>
      <div class="cat-btn text-center mt-2">
        <a href="/repolist" class="btn btn-secondary text-uppercase">More REPO</a>
      </div>
    </div>
  </div>
</template>

<script>
import RepoCard from '../repos/RepoCard.vue'

export default {
  name: "ContainerRepoCollection",

  data() {
    return {
      compItems: [],
      repoUrl: "",
      totalCount: 0
    }
  },

  components: { RepoCard },

  props: {
    itemsPerRow: {
      type: Number,
      default: 3,
      validator: function(value) {
        return [1, 2, 3, 4].indexOf(value) !== -1;
      }
    },

    title: {
      type: String,
      default: ""
    }

  },

  created() {
    this.$axios
      .get("https://api.github.com/orgs/catalyst/repos")
      .then(res => {

        this.compItems = res.data.sort(function(a, b){
          return new Date(b.updated_at) - new Date(a.updated_at)
        }).slice(0, 6);

      })

    this.$axios
      .get("https://api.github.com/orgs/catalyst")
      .then(res => {
        this.repoUrl = res.data.html_url;
        this.totalCount = res.data.public_repos;
      })
  }

}
</script>