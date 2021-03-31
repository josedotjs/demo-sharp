<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <!-- navbar items, navbar burger... -->

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
        <navbar-item to="/composition" label="Composition" />
        <!-- 
        <navbar-item to="/operations" label="Operaciones" />
        -->
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