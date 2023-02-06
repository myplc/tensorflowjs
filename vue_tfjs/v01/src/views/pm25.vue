<template>
  <div>공공API 공기질 데이터</div>
  <hr />
  <button @click="getpm25">부산지역 공기질데이터 가져오기</button>
  <div>{{ pm25 }}</div>
</template>
<script>
export default {
  data() {
    return {
      pm25: ''
    }
  },
  methods: {
    getpm25: function () {
      const key = process.env.VUE_APP_pkey
      // process.env.serviceKey = '?' 환경변수
      const surl =
        'http://apis.data.go.kr/6260000/AirQualityInfoService/getAirQualityInfoClassifiedByStation?serviceKey=' +
        key +
        '&pageNo=1&numOfRows5&areaIndex=221162&resultType=json'
      this.pm25 = '데이터 크롤링중...'
      console.log(surl)
      fetch(surl)
        .then((response) => response.json())
        .then((body) => {
          const _ = body.getAirQualityInfoClassifiedByStation.body.items.item[0]
          const str = `부산의 초미세먼지:${_.pm25}, 미세먼지:${_.pm10}, 일산화탄소${_.co}`
          console.log(str)
          this.pm25 = str
        })
    }
  },
  components: {}
}
</script>
<style></style>
