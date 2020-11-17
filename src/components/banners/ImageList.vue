<template>
  <div
    class="cat-slider"
    ref="bannerImageSlider"
    @mouseover="mouseIsOver = true"
    @mouseleave="mouseIsOver = false"
  >
    <div
      class="cat-slider-track"
      :style="{ height: `${slideHeight}px` }"
      ref="slidesWrap"
    >
      <image-list-item
        v-for="(imageItem, index) in items"
        :key="index"
        :image-item="imageItem"
        :class="{ active: index === currentTrackCount - 1 }"
        @slide-height="setTrackHeight"
      ></image-list-item>
    </div>

    <div class="cat-slider-controls">
      <div class="cat-slider-controls-count">
        <span>
          <strong>{{ currentTrackCount }}</strong>
        </span>
        <span> of </span>
        <span>{{ itemsCount }}</span>
      </div>
      <!-- <div class="cat-slider-controls-pos">
        <div
          class="cat-slider-controls-pos-indicator"
          ref="indicatorWidthEl"
          :style="{ width: indicatorWidth + '%' }"
          :class="{ finished: indicatorFinshed }"
          v-if="imageAutoPlay"
        ></div>
        <div class="cat-slider-controls-pos-total" v-if="imageAutoPlay"></div>
      </div> -->
      <div class="cat-slider-controls-buttons">
        <!-- <a
          href="#"
          class="cat-slider-controls-pause"
          @click.prevent="playToggleClick()"
        >
          <i class="fas fa-pause" v-if="!sliderIsPaused"></i>
          <i class="fas fa-play" v-if="sliderIsPaused"></i>
        </a> -->

        <a
          href="#"
          class="cat-slider-controls-prev"
          @click.prevent="prevClick()"
        >
          <i class="fas fa-chevron-left"></i>
          <span class="sr-only">Previous slide</span>
        </a>

        <a
          href="#"
          class="cat-slider-controls-next"
          @click.prevent="nextClick()"
        >
          <i class="fas fa-chevron-right"></i>
          <span class="sr-only">Next slide</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { infiniteSlider } from "@/mixins/SliderInfinite";
import ImageListItem from "@/components/banners/ImageListItem";

export default {
  name: "ImageList",

  mixins: [infiniteSlider],

  components: {
    ImageListItem
  },

  props: {
    imageAutoPlay: {
      type: Boolean,
      default: true
    },

    imageAutoPlaySpeed: {
      type: Number,
      default: 6000
    },

    items: {
      type: Array,
      default: function() {
        return [
          
        ];
      }
    }
  }
};
</script>
