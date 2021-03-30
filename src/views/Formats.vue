<template>
  <div class="home">
    <dropzone-container>
      <vue-dropzone
        id="dropzone"
        :options="dropzoneOptions"
        @vdropzone-success="onFileSuccess"
      />
    </dropzone-container>
    <section class="section">
      <div class="container">
        <div
          class="columns is-multiline box"
          v-for="response in responses"
          :key="response.key"
        >
          <div
            class="column is-3-desktop"
            v-for="image in response.images"
            :key="image.fileBaseName"
          >
            <div class="has-text-centered">
              <small class="is-small">
                {{ image.format }}
              </small>
            </div>
            <picture>
              <source
                :srcset="`/images/${image.fileBaseName}`"
                :type="`image/${image.format}`"
              />
              <img :src="`/images/nosoportado.png`" alt="" />
            </picture>
          </div>
          <div class="column is-12">
            <chart-formats :data="response.images"></chart-formats>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import ChartFormats from '@/components/ChartFormats.vue'

export default {
  name: 'Formats',
  components: {
    ChartFormats
  },
  data() {
    return {
      dropzoneOptions: {
        url: '/api/formats',
      },
      responses: [],
    }
  },
  methods: {
    onFileSuccess(file, response) {
      console.log('success', response)
      this.responses.unshift({
        key: +new Date(),
        images: response,
      })
    },
  }
}
</script>
