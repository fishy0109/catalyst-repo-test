<template>
  <div >
    <navigation-global></navigation-global>
    <header id="cat-header">
      <header-logo-section></header-logo-section>
      <header-menu></header-menu>
    </header>
    
    <banner-hero></banner-hero>
    <container-icon-collection
    :itemsPerRow="3"
    title="What We Do"
    ></container-icon-collection>
    <container-repo-collection
    :itemsPerRow="3"
    ></container-repo-collection>

    <footer-global></footer-global>
  </div>
</template>

<script>
import HeaderMenu from '@/components/headers/HeaderMenu.vue'
import HeaderLogoSection from '@/components/headers/HeaderLogoSection.vue'
import NavigationGlobal from '@/components/headers/NavigationGlobal.vue'
import BannerHero from '@/components/banners/BannerHero.vue'
import FooterGlobal from '@/components/footers/FooterGlobal.vue'
import ContainerIconCollection from '@/components/containers/ContainerIconCollection.vue'
import ContainerRepoCollection from '@/components/containers/ContainerRepoCollection.vue'

// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',

  components: {
    HeaderLogoSection,
    HeaderMenu,
    NavigationGlobal,
    BannerHero,
    FooterGlobal,
    ContainerIconCollection,
    ContainerRepoCollection
  }
}
</script>
