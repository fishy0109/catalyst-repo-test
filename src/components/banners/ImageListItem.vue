<template>
  <div class="cat-slider-item">
    <div class="cat-slider-item-sizer" ref="sliderSizer">
      <a :href="imageItem.link" class="h4 cat-slider-header">
        {{ imageItem.title | truncate(70) }}
      </a>
      <div class="font-family-2">
        <p>{{ imageItem.content | truncate(200) }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { truncateText } from "@/mixins/Truncate";
export default {
  name: "ImageListItem",

  mixins: [truncateText],

  data() {
    return {
      slideHeight: 0
    };
  },

  components: {},

  props: {
    imageItem: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },

  computed: {
    getItemHeight: function() {
      return this.$refs.sliderSizer.offsetHeight;
    }
  },

  mounted() {
    this.emitSliderHeight(this.getItemHeight);
    window.addEventListener("resize", this.windowResize);
  },

  methods: {
    calcSlideHeight: function() {
      this.slideHeight = this.$refs.sliderSizer.offsetHeight;
      this.emitSliderHeight(this.slideHeight);
    },

    emitSliderHeight: function(height) {
      this.$emit("slide-height", parseInt(height));
    },

    windowResize() {
      this.calcSlideHeight();
    }
  }
};
</script>
