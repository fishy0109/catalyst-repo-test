<template>
  <div class="cat-header-menu">
    <nav class="cat-header-nav">
      <div class="container">
        <div class="row">
          <div class="col">
            <ul>
              <li>
                <router-link to="/">Home</router-link>
              </li>
              <li>
                <router-link to="/repolist">Catalyst Repositories</router-link>
              </li>
              <li class="text-right">
                <router-link to="/about">About Us</router-link>
              </li>
              <li class="text-right">
                <router-link to="/contact">Contact Us</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    

  </div>
</template>

<script>

export default {
  name: "HeaderMenu"
};
</script>
