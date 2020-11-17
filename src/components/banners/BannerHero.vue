<template>
  <div>
    <div class="cat-banner">
      <div
        class="cat-banner-overlay"
      ></div>

      <div class="cat-banner-bg">
        <div
          v-for="(bg, index) in compItems"
          :key="index"
          :class="{ active: index === activeSlide }"
          :style="{ 'transition-duration': `${imageAutoPlaySpeed / 500}s` }"
          class="cat-banner-bg-img"
        >
          <div
            :style="{
              'background-image': 'url(' + bg.image + ')',
              'background-position-x': bg.imagePosX,
              'background-position-y': bg.imagePosY
            }"
            class="img"
          ></div>
        </div>
      </div>

      <div class="cat-banner-search-wrap">

        <div class="cat-banner-image-detail-wrap">
          <div class="container container-mob-pad">
            <div class="row">
              <div :class="title ? 'col-lg-5' : 'd-none'">
                <h2>{{ title }}</h2>
              </div>

              <div
                :class="title ? 'col-lg-6 offset-lg-1' : 'col-lg-8 offset-lg-2'"
              >
                <image-list
                  ref="imageList"
                  :items="compItems"
                  :image-auto-play="imageAutoPlay"
                  :image-auto-play-speed="imageAutoPlaySpeed"
                  @banner-image="setActiveSlide"
                  :key="componentKey"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { truncateText } from "@/mixins/Truncate";
import ImageList from "@/components/banners/ImageList";

export default {
  name: "BannerHero",

  components: {
    ImageList
  },

  mixins: [truncateText],

  data() {
    return {
      activeSlide: "",
      compItems: [
        {
          image: "https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849825_960_720.jpg",
          title: "Virtual Classrooms",
          link: "https://catalyst-ca.net/products/virtual-classrooms",
          content:
            "Looking for a video conferencing alternative?"
        },
        {
          image: "https://cdn.pixabay.com/photo/2016/03/09/09/22/workplace-1245776_960_720.jpg",
          title: "Moodle",
          link: "https://catalyst-ca.net/products/moodle",
          content:
            "With Moodle  you will excel in collaborative learning using a world-class online learning management system."
        },
        {
          image: "https://cdn.pixabay.com/photo/2015/04/20/13/17/work-731198_960_720.jpg",
          title: "Totara",
          link: "https://catalyst-ca.net/products/totara",
          content:
            "Totara learning is a custom distribution of Moodle for the corporate sector."
        },
        {
          image: "https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_960_720.jpg",
          title: "GovCMS",
          link: "https://catalyst-ca.net/products/govcms",
          content:
            "GovCMS is an open source web content management system designed for government agencies."
        }
      ],
      componentKey: 0
    };
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

    title: {
      type: String,
      default: "A global team of open source experts"
    },

    items: {
      type: Array,
      default: function() {
        return [
          
        ];
      }
    }
  },

  methods: {
    forceRerender() {
      this.componentKey += 1;
    },

    stopImageTimer() {
      this.$refs.imageList.startTimer();
    },

    setActiveSlide(value) {
      // slight delay added to ensure animation trigger on first slide load
      setTimeout(() => {
        this.activeSlide = value;
      }, 100);
    }
  }
};
</script>
