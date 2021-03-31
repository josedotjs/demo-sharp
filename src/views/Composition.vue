<template>
  <div>
    <dropzone-container>
      <vue-dropzone
        id="dropzone"
        :options="dropzoneOptions"
        @vdropzone-sending="sendingEvent"
        @vdropzone-success="onFileSuccess"
      />
    </dropzone-container>
    <div class="container">
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="box">
              <div class="field">
                <div class="control">
                  <label for="" class="label is-small">Marca</label>
                  <div class="columns" style="padding: 1rem">
                    <div
                      class="column"
                      v-for="marca in marcas"
                      :key="marca"
                      :class="{
                        'has-background-grey-lighter':
                          marca === selectedWatermark,
                      }"
                      @click="selectedWatermark = marca"
                    >
                      <figure class="image is-32x32 has-text-centered">
                        <img :src="marca" />
                      </figure>
                    </div>
                  </div>
                </div>
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" v-model="fitToDest" />
                    Igualar al destino
                  </label>
                  <label class="checkbox" style="margin-left: 1rem">
                    <input type="checkbox" v-model="repeat" />
                    Repetir
                  </label>
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <label for="" class="label is-small">Ubicación marca</label>
                  <location-options v-model="watermarkLocation" />
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <div class="field">
                <div class="control">
                  <label class="label is-small">Texto</label>
                  <textarea rows="2" class="textarea" v-model="text" />
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <label for="" class="label is-small">Tamaño letra</label>
                  <div class="select">
                    <select v-model.number="textSize">
                      <option value="24">24</option>
                      <option value="48">48</option>
                      <option value="72">72</option>
                      <option value="96">96</option>
                    </select>
                  </div>
                </div>
                <div class="control">
                  <label for="" class="label is-small">Ubicación texto</label>
                  <location-options v-model="textLocation" />
                </div>
                <div class="control">
                  <label for="" class="label is-small">Color texto</label>
                  <input type="color" class="input" v-model="textColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocationOptions from '@/components/LocationOptions.vue'

export default {
  components: {
    LocationOptions
  },
  data() {
    return {
      dropzoneOptions: {
        url: '/api/composition',
      },
      images: [],
      fitToDest: false,
      repeat: false,
      selectedWatermark: '/images/01.svg',
      watermarkLocation: 'northeast',
      marcas: [
        '/images/01.svg',
        '/images/02.png',
        '/images/03.png',
        '/images/04.png',
        '/images/05.png',
      ],
      text: '',
      textSize: 48,
      textColor: '#ff00ff',
      textLocation: 'center'
    }
  },
  methods: {
    onFileSuccess(file, response) {
      this.images.push(response)
    },
    sendingEvent(file, xhr, formData) {
      // Propiedades de la marca (imagen)
      formData.append('waterMarkFileName', this.selectedWatermark)
      formData.append('watermarkLocation', this.watermarkLocation)     
      formData.append('tile', this.repeat)
      formData.append('fitToDest', this.fitToDest)
      
      // Propiedades del texto
      formData.append('text', this.text)
      formData.append('textColor', this.textColor)
      formData.append('textLocation', this.textLocation)
      formData.append('textSize', this.textSize)
    },
  }
}
</script>

<style>
</style>