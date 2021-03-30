<template>
  <div>
    <dropzone-container>
      <vue-dropzone
        id="dropzone"
        :options="dropzoneOptions"
        @vdropzone-success="onFileSuccess"
        @vdropzone-sending="sendingEvent"
      />
    </dropzone-container>
    <dropzone-container>
      <div class="box">
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <label for="" class="label is-small">Ancho (Width)</label>
            <input type="number" class="input" v-model.number="size.width" />
          </p>
          <p class="control">
            <label for="" class="label is-small">Alto (Height)</label>
            <input type="number" class="input" v-model.number="size.height" />
          </p>
        </div>
      </div>
    </dropzone-container>
    <section class="section">
      <div class="container box" v-for="imageSet in images" :key="imageSet.id">
        <div class="columns">
          <div class="column" v-for="image in imageSet" :key="image.path">
            <image-info :image="image" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import DropzoneContainer from '../components/DropzoneContainer.vue'
import ImageInfo from '@/components/ImageInfo.vue'

export default {
  components: { ImageInfo },
  data() {
    return {
      size: {
        width: 640,
        height: 480
      },
      dropzoneOptions: {
        url: '/api/resize',
      },
      images: []
    }
  },
  methods: {
    onFileSuccess(file, response) {
      response.id = +new Date()
      this.images.unshift(response)
    },
    sendingEvent(file, xhr, formData) {
      formData.append('width', this.size.width)
      formData.append('height', this.size.height)
      // formData.append('color', this.color)
    },
  }
}
</script>

<style>
</style>