<template>
  <a v-bind:href="link" :target="target" class="cat-icons-app-item">
    <div class="cat-icons-shadow">
    </div>
    <div class="cat-icons-app-icon">
      <img :src="icon" :alt="heading" />
    </div>
    <span class="cat-icon-title mb-1">{{ heading }}</span>
    <span>{{ description }}</span>
  </a>
</template>

<script>

export default {
  name: "Icon",

  props: {
    icon: {
      type: String,
      default: ""
    },

    heading: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
    },

    link: {
      type: String,
      default: "/"
    },

    target: {
      type: String,
      default: "_self",
      validator: function(value) {
        return ["_self", "_blank"].indexOf(value) !== -1;
      }
    }
  }
};
</script>
