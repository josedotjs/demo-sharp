<template>
  <router-link class="navbar-item" :to="to">{{ label }}</router-link>
</template>

<script>
export default {
  props: ['to', 'label']
}
</script>

<style>
</style>