<template>
  <div>3. 캠 얼굴인식</div>
  <button @click="main">캠동작</button>
  <button @click="analyze">분석</button>
  <p v-if="length">{{ length }}</p>
  <div id="display">
    <canvas width="400" height="400" id="canvas"></canvas>
  </div>
</template>
<script>
import * as tf from '@tensorflow/tfjs'
import * as blazeface from '@tensorflow-mod els/blazeface'
const videoElement = document.createElement('video')
// const tf = this.$tf
export default {
  data() {
    return {
      img: '',
      predictions: '',
      length: 0
    }
  },
  methods: {
    main: async function () {
      this.length = '얼굴인식 중...'
      const display = document.getElementById('display')
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')

      display.append(videoElement)
      videoElement.width = 600
      videoElement.height = 600
      const CAMERA_SIZE = { height: 600, width: 600 }
      await tf.data.webcam(videoElement)

      for (;;) {
        const blaze = await blazeface.load()
        const predictions = await blaze.estimateFaces(videoElement)
        tf.dispose(blaze) // 메모리 비우기1
        this.predictions = predictions
        this.length = predictions.length + '명 검출'
        // 그려 줄 캔버스 사이즈 지정

        if (predictions.length > 0) {
          for (let i = 0; i < predictions.length; i++) {
            const start = predictions[i].topLeft
            const end = predictions[i].bottomRight
            const size = [end[0] - start[0], end[1] - start[1]]
            canvas.height = CAMERA_SIZE.height
            canvas.width = CAMERA_SIZE.width
            ctx.strokeStyle = 'greenyellow'
            ctx.lineWidth = 4
            // 화면상에 여러개 그려준다.
            const loop = () =>
              ctx.strokeRect(start[0], start[1], size[0], size[1])
            setTimeout(loop, 0) // drawing at 30fps
          }
        } else {
          canvas.height = 0
          canvas.width = 0
          // ctx.strokeRect(start[0], start[1], size[0], size[1])
        }
      }
      // img.print()
      // this.img = img
    },
    analyze: function () {
      console.log(this.predictions)
      console.log(this.length)
    }
  },
  components: {}
}
</script>
<style scoped>
#display {
  /* display: flex; */
  position: relative;
}
canvas {
  position: absolute;
}
video {
  position: absolute;
}
</style>
