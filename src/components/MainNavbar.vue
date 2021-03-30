<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <!-- navbar items, navbar burger... -->
      <router-link class="navbar-item" to="/">
        <img
          src="https://beerjscba.com/statics/images/logo.1574320377158.svg"
          alt="Beerjs Córdoba"
          height="28"
        />
        <span style="margin-left: 0.5rem"><b>BeerjsCba</b></span>
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        @click="isActive = !isActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': isActive }">
      <!-- navbar start, navbar end -->
      <div class="navbar-start">
        <navbar-item to="/formats" label="Formatos" />
        <navbar-item to="/resize" label="Resize" />
        <navbar-item to="/gifwebp" label="Gif vs Webp" />
        <navbar-item to="/operations" label="Operaciones" />
      </div>
      <div class="navbar-end">
        <!-- navbar items -->
      </div>
    </div>
  </nav>
</template>

<script>

import NavbarItem from './NavbarItem.vue'

export default {
  components: {
    NavbarItem
  },
  data() {
    return {
      isActive: false,
    }
  },
}
</script>

<style></style>