<template>
  <div>
    <navigation-global></navigation-global>
    <header id="cat-header">
      <header-logo-section></header-logo-section>
      <header-menu></header-menu>
    </header>

    <div class="cat-page-title py-5">
      <div class="container">
        <h1>Repository list</h1>
      </div>
    </div>

    <container-repo-list></container-repo-list>
    <footer-global></footer-global>
  </div>
</template>

<script>
import HeaderMenu from '@/components/headers/HeaderMenu.vue'
import HeaderLogoSection from '@/components/headers/HeaderLogoSection.vue'
import NavigationGlobal from '@/components/headers/NavigationGlobal.vue'
import ContainerRepoList from '@/components/containers/ContainerRepoList.vue'
import FooterGlobal from '@/components/footers/FooterGlobal.vue'

export default {
  name: "CatRepoList",

  components: {
    HeaderLogoSection,
    HeaderMenu,
    NavigationGlobal,
    FooterGlobal,
    ContainerRepoList

  }
}
</script>