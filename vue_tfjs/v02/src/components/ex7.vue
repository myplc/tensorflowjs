<template>
  <div>ex7 예제 with Chatjs</div>
  <button @click="chart()">Chartjs</button><br />
  <canvas id="myChart"></canvas>
</template>
<script setup>
import Chart from 'chart.js/auto'
function chart() {
  const ctx = document.getElementById('myChart')
  const dataset = [
    {
      label: 'Scatter Dataset',
      data: [
        { x: 1, y: 20 },
        { x: 2.2, y: 30 },
        { x: 3, y: 5 },
        { x: 4.3, y: 12 },
        { x: 1.7, y: 40 },
        { x: 2.3, y: 0 },
        { x: 3.5, y: 44 },
        { x: 4.2, y: -5 }
      ],

      backgroundColor: 'rgb(255, 99, 132)'
    }
  ]
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: dataset
    },
    options: {
      responsive: false, // 반응형 끄기
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  })
}
</script>
