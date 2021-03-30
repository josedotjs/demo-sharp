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
      <div class="container box" v-for="(imagePack, idx) in images" :key="idx">
        <div class="columns">
          <div
            class="column is-6"
            v-for="image in imagePack"
            :key="image.fileName"
          >
            <div class="has-text-centered">
              <small class="is-small">
                {{ image.info.format }}
              </small>
            </div>
            <image-info :image="image" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ImageInfo from '@/components/ImageInfo.vue'
export default {
  components: {
    ImageInfo
  },
  computed: {
    chartData() {
      return this.images.map(imagePack => {
        return imagePack.map(image => image.info)
      })[0]
    }
  },
  data() {
    return {
      dropzoneOptions: {
        url: '/api/gifwebp',
      },
      images: []
    }
  },
  methods: {
    onFileSuccess(file, response) {
      response.key = +new Date()
      this.images.push(response)
    },
  }
}
</script>

<style>
</style>