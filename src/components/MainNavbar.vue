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
        <router-link class="navbar-item" to="/gifs"> Gifs </router-link>
        <router-link class="navbar-item" to="/resize"> Resize </router-link>
        <router-link class="navbar-item" to="/composition">
          Composition
        </router-link>
        <router-link class="navbar-item" to="/operations">
          Operations
        </router-link>
        <router-link class="navbar-item" to="/color"> Color </router-link>
        <router-link class="navbar-item" to="/mix"> Create </router-link>
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