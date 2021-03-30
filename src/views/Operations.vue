<template>
  <div>
    <dropzone-container>
      <vue-dropzone
        id="dropzone"
        :options="dropzoneOptions"
        @vdropzone-success="onFileSuccess"
      />
    </dropzone-container>
    <section class="section">
      <div class="container" v-for="(imagePack, idx) in images" :key="idx">
        <div class="columns is-multiline">
          <div
            class="column is-3-desktop is-6-tablet is-12-phone"
            v-for="image in imagePack"
            :key="image.file"
          >
            <div class="has-text-centered">
              <small class="small">
                {{ image.operationName }}
              </small>
            </div>
            <img :src="`/images/${image.file}`" alt="" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropzoneOptions: {
        url: '/api/operations',
      },
      images: []
    }
  },
  methods: {
    onFileSuccess(file, response) {
      console.log(file, response)
      this.images.push(response)
    }
  }
}
</script>

<style>
</style>