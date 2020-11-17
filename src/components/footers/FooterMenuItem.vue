<template>
  <ul class="pl-0 mb-0">
    <li v-for="(footerItem, index) in footerItems" :key="index">
      <template v-if="footerItem.title === 'Feedback' || footerItem.isFeedback">
        <a
          :href="footerItem.link"
          class="btn btn-primary btn-sm"
        >
          {{ footerItem.title }}
        </a>
      </template>

      <template v-if="footerItem.title != 'Feedback' && !footerItem.isFeedback">
        <a :href="footerItem.link">
          {{ footerItem.title }}
        </a>
      </template>
    </li>

    <!-- :class="{ 'btn btn-primary btn-sm': footerItem.isFeedback }" -->
  </ul>
</template>

<script>
export default {
  name: "FooterMenuItem",

  props: {
    footerItems: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>
