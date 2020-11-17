<template>
  <div>
    <!-- Search filter -->
    <div class="cat-repo-search py-3">
      <div class="container">
        <div class="row">
          <div class="col-12 order-2 order-xl-1">
            <div class="cat-repo-search-inner d-flex align-items-center">

              <div class="cat-repo-filter d-flex">
                <label class="control control--radio" >
                  <input
                    type="radio"
                    v-model="selectedCategory"
                    value="forked"
                  />
                  <span>Forked</span>
                  <div class="control__indicator"></div>
                </label>
                <label class="control control--radio" >
                  <input
                    type="radio"
                    v-model="selectedCategory"
                    value="nforked"
                  />
                  <span>Not Forked</span>
                  <div class="control__indicator"></div>
                </label>
                <label class="control control--radio" >
                  <input
                    type="radio"
                    v-model="selectedCategory"
                    value="all"
                  />
                  <span>All</span>
                  <div class="control__indicator"></div>
                </label>

              </div>
            </div>
          </div>

          <!-- <div class="col-12 order-1 order-xl-2">
            <div class="btn-reset-wrap">
              <a href="#" class="btn-reset" @click.prevent="resetForm()">
                <i class="fas fa-sync"></i>
                Reset search
              </a>
            </div>
          </div> -->
        </div>
      </div>
  </div>

  <!-- Sort by -->
  <div class="cat-repo-sort">
    <div class="cat-repo-sort-inner container d-flex align-items-center justify-content-between pt-3">
      <div class="form-group cat-input-select">
        <label class="text-uppercase" for="sort">Sort by</label>
        <div class="select">
          <select
            class="form-control"
            id="sort"
            v-model="sortBy"
            @change="sortData()"
          >
            <option
              v-for="(option, index) in sortOptions"
              :key="index"
              :value="option.value"
              :selected="option.active"
            >
              {{ option.title }}
            </option>
          </select>
          <div class="select__arrow"></div>
        </div>
      </div>

      <div class="form-group cat-input-select">
        <label class="text-uppercase" for="order">Order</label>
        <div class="select">
          <select
            class="form-control"
            id="order"
            v-model="orderBy"
            @change="sortData()"
          >
            <option
              v-for="(option, index) in orderOptions"
              :key="index"
              :value="option.value"
              :selected="option.active"
            >
              {{ option.title }}
            </option>
          </select>
          <div class="select__arrow"></div>
        </div>
      </div>

    </div>
  </div>


  <!-- Repo list -->
  <div class="cat-bg-pattern">
    <div class="cat-container-repo-list container pb-4">

    <div class="row">
      <div
        v-for="(item, index) in filteredCompItems"
        :key="index"
        class="col-12"
      >
        <template>
          <repo-tile-item
          :link="item.html_url"
          :fork="item.fork"
          :title="item.name"
          :description="item.description"
          :language="item.language"
          :time="item.updated_at"
          :forkCount="item.forks_count"
          :starCount="item.stargazers_count"
          :watchCount="item.watchers_count"
          :license="item.license"
          :contributors="item.contributors_url"
          ></repo-tile-item>
        </template>
      </div>
    </div>
  </div>
  </div>
  </div>
  
  
</template>

<script>
import RepoTileItem from '../repos/RepoTileItem.vue';

export default {
  name: "ContainerRepoList",

  data() {
    return {
      compItems: [],
      license: {},
      selectedCategory: "All",
      sortOptions: [
        {
          value: "created_at",
          title: "Created time"
        },
        {
          value: "updated_at",
          title: "Updated time"
        },
        {
          value: "full_name",
          title: "Full name"
        }
      ],
      orderOptions: [
        {
          value: "ASC",
          title: "ASC"
        },
        {
          value: "DESC",
          title: "DESC"
        }
      ],
      sortBy: "updated_at",
      orderBy: "DESC"
    }
  },
  

  components: { RepoTileItem },

  props: {
    
  },

  created() {
    this.$axios
      .get("https://api.github.com/orgs/catalyst/repos")
      .then(res => {
        this.compItems = res.data.sort(function(a, b){
          return new Date(b.updated_at) - new Date(a.updated_at)
        }).slice(0, 10);
        this.license = res.data.license;
      })
  },

  computed: {
    filteredCompItems: function() {
      if(this.selectedCategory === "all") {
        return this.compItems;
      } else if(this.selectedCategory === "forked"){
        return this.compItems.filter(function(item) {
          return item.fork === true;
        });
      } else {
        return this.compItems.filter(function(item) {
          return item.fork === false;
        });
      }

    }
  },

  methods: {
    sortData() {
      var sortKey = this.sortBy;
      return this.filteredCompItems.sort(function(a, b) {
        if(this.orderBy == "ASC") {
          return a.sortkey - b.sortkey;
        } else {
          return b.sortkey - a.sortkey;
        }
      })
      
    }
  }

    // filteredCompItems: function() {
    //   var sortKey = this.sortBy;
    //   return this.compItems.sort(function(a, b) {
    //     if(this.orderBy == "ASC") {
    //     return a.sortKey - b.sortKey;
    //   } else {
    //     return b.sortKey - a.sortKey;
    //   }
    //   })
    // }
  

}
</script>