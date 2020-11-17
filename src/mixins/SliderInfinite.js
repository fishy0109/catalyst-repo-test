export const infiniteSlider = {
  data() {
    return {
      mouseIsOver: false,
      currentTrackCount: 1,
      indicatorWidth: 0,
      indicatorFinshed: false,
      indicatorFinshedCount: 0,
      interval: 0,
      activeTimers: 0,
      time: 1000,
      sliderIsPaused: false,
      prevCalled: false,
      nextCalled: false,
      slides: null,
      slideFirst: null,
      slideLast: null,
      slideLastMoved: false,
      slideHeightCount: 0,
      slideHeightArray: [],
      slideHeight: 0,
      prevSlideCalled: false,
      nextSlideCalled: false,
    };
  },

  computed: {
    itemsCount: function() {
      return this.items.length;
    },
  },

  watch: {
    compItems: function() {
      this.imageListInit();
    },
  },

  mounted() {
    if (this.items.length > 1) {
      this.imageListInit();
      this.slideSetUp();
    }
  },

  methods: {
    imageListInit() {
      this.toggleTimer();
      this.calcBgImage(0);
      // this.listenForTab();
    },

    calScreenWidth: function() {
      this.screenWidth = window.innerWidth;
    },

    calcBgImage: function(itemNo) {
      this.$emit("banner-image", itemNo);
    },

    setTrackHeight: function(slideHeight) {
      // set the track height to the biggest slide height
      // this value is emmited from newListItem, built into and array then cleared down

      this.slideHeightArray.push(slideHeight);
      this.slideHeightCount++;

      if (this.slideHeightCount === this.itemsCount) {
        this.slideHeight = 0;
        let i;
        for (i = 0; i <= this.slideHeightCount - 1; i++) {
          // find the largest value and set to sliderHeight
          if (this.slideHeightArray[i] > this.slideHeight) {
            this.slideHeight = this.slideHeightArray[i];
          }
        }

        // reset count and array contents
        this.slideHeightCount = 0;
        this.slideHeightArray = [];
      }
    },

    prevClick() {
      // set current track count to total items when item count reached
      if (this.currentTrackCount === 1) {
        this.currentTrackCount = this.itemsCount;
      } else {
        this.currentTrackCount--;
      }

      this.calcBgImage(this.currentTrackCount - 1);
      this.resetTimer();
      this.rePositionSlides("slideL2R");
      this.prevCalled = true;
      this.prevSlideCalled = true;
      this.nextSlideCalled = false;
    },

    nextClick: function() {
      // reset current track count when item count reached
      if (this.currentTrackCount === this.itemsCount) {
        this.currentTrackCount = 1;
      } else {
        this.currentTrackCount++;
      }

      this.calcBgImage(this.currentTrackCount - 1);
      this.resetTimer();
      this.rePositionSlides("slideR2L");
      this.nextCalled = true;
      this.prevSlideCalled = false;
      this.nextSlideCalled = true;
    },

    insertAfter(el, referenceNode) {
      referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    },

    insertBefore(el, referenceNode) {
      referenceNode.parentNode.insertBefore(el, referenceNode);
    },

    slideSetUp() {
      // move the last slide first to set up infinitate scrolling,
      // only perfomr this function once on page load
      if (!this.slideLastMoved) {
        this.slideLastMoved = true;

        // timout of zero stops jest error?
        setTimeout(() => {
          if (this.$refs.slidesWrap != undefined) {
            this.slides = this.$refs.slidesWrap.querySelectorAll(
              ".cat-slider-item"
            );
            this.slideFirst = this.slides.item(0);
            this.slideLast = this.slides.item(this.itemsCount - 1);
            //this.insertBefore(this.slideLast, this.slideFirst);
          }
        }, 0);
      }
    },

    rePositionSlides(direction) {
      if (this.$refs.slidesWrap != undefined) {
        this.slides = this.$refs.slidesWrap.querySelectorAll(
          ".cat-slider-item"
        );
        this.slideFirst = this.slides.item(0);
        this.slideLast = this.slides.item(this.itemsCount - 1);
      }

      // if two slides dont reorder slides as causing a bug with
      // transision styles
      if (this.slides.length !== 2) {
        // move the slides around based on active state
        if (direction === "slideL2R") {
          this.insertBefore(this.slideLast, this.slideFirst);
        } else if (direction === "slideR2L") {
          this.insertAfter(this.slideFirst, this.slideLast);
        }
      }
    },

    calcIndicatorPos() {
      // stop when indicatorWidth reached 100%
      this.indicatorFinshed = false;
      if (this.indicatorWidth <= 100) {
        this.indicatorWidth = parseInt(
          (this.time / this.imageAutoPlaySpeed) * 100
        );
      } else {
        this.indicatorFinshed = true;
        this.indicatorFinshedCount++;

        // stop function getting multipul calls
        // add class for finsihed indicator animation
        if (this.indicatorFinshedCount === 1) {
          this.pauseTimer();

          // time out time to match class
          // .cat-banner-image-slider-pos-indicator.finished trasision time
          setTimeout(() => {
            this.nextClick();
            this.startTimer();
          }, 1000);

          // reset timer for next time
          this.indicatorFinshedCount = 0;
        }
      }
    },

    playToggleClick: function() {
      this.sliderIsPaused = !this.sliderIsPaused;
      this.toggleTimer();
    },

    toggleTimer() {
      if (this.sliderIsPaused) {
        this.pauseTimer();
      } else {
        if (this.activeTimers < 1) {
          this.startTimer();
        }
      }
    },

    incrementTime() {
      this.time = parseInt(this.time) + 100;
      this.calcIndicatorPos();
    },

    pauseTimer() {
      this.activeTimers = 0;
      clearInterval(this.interval);
    },

    startTimer() {
      if (this.imageAutoPlay) {
        this.activeTimers = 1;
        this.interval = setInterval(this.incrementTime, 100);
      }
    },

    resetTimer() {
      this.time = 0;
      this.indicatorWidth = 0;
    },

    // move slider when tab or shift + tab pressed
    listenForTab(e) {
      this.$refs.slidesWrap.onkeydown = (e) => {
        switch (e.which) {
          case 9: // tab
            if (e.shiftKey) {
              this.prevClick(); // shift tab=
              break;
            }
            this.nextClick();
            break;

          case 37: // left
            this.prevClick();
            break;

          case 39: // right
            this.nextClick();
            break;

          default:
            return;
        }
      };
    },
  },
};
