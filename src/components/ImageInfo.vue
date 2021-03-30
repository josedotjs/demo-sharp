<template>
  <div class="item">
    <figure class="image">
      <img :src="`/images/${image.path}`" />
    </figure>
    <div class="data-footer">
      <div>
        <small>Width: {{ image.info.width }}</small>
      </div>
      <div>
        <small>Height: {{ image.info.height }}</small>
      </div>
      <div>
        <small>Size: {{ image.info.size.toLocaleString("es-AR") }} bytes</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['image']
}
</script>

<style scoped>
.data-footer {
  padding: 2rem;
}
</style>