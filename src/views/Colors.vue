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
      <div class="container">
        <div class="columns is-centered">
          <div class="column">
            <div class="box">
              <div class="contenedor-canvas">
                <canvas class="canvas shadow" ref="canvas"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { fabric } from 'fabric'
export default {
  data() {
    return {
      dropzoneOptions: {
        url: '/api/colors',
      },
    }
  },
  methods: {
    onFileSuccess (file, response) {
      console.log(response)
      response.reverse().map((imageName, idx) => {
        fabric.Image.fromURL(
          `/images/${imageName}`,
          newImage => {
            if (idx === 0) {
              this.canvas.setWidth(newImage.width + 120)
              this.canvas.setHeight(newImage.height + 20)
            }
            // newImage.scaleToWidth(width)
            // newImage.top = top
            // newImage.left = left
            newImage.left = 30 * (idx + 1)
            newImage.top = 5
            newImage.set('opacity', 0.5)
            this.canvas.add(newImage)
          },
          { crossOrigin: 'Anonymous' }
        )
      })
      
    }
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas)
  }
}
</script>

<style scoped>
.canvas {
  border: 1px solid #ccc;
}
.contenedor-canvas {
  display: flex;
  align-items: center;
  margin-right: auto;
  padding-left: auto;
  justify-content: center;
}
.shadow {
  -webkit-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
}
</style>