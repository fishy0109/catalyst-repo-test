<template>
  <div class="cat-container-collection container">
    <div v-if="title" class="mt-5 mb-3">
      <h2 class="cat-section-header-text text-center">{{ title }}</h2>
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
          <icon
          :icon="item.icon"
          :heading="item.heading"
          :description="item.description"
          :link="item.link"
          :target="item.target"
          ></icon>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../icons/Icon.vue'
import json from "../../../public/json/icons.json"

export default {
  name: "ContainerIconCollection",

  data() {
    return {
      compItems: json.iconItems
    }
  },

  components: { Icon },

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

  }
}
</script>