// const app = require('express')
// app().use(app.static('dist'))
// app().listen(3000, () => console.log('켜짐'))
const express = require('express')
const history = require('connect-history-api-fallback')
const { createProxyMiddleware } = require('http-proxy-middleware')
const path = require('path')
const logger = require('morgan')
const app = express()

const _path = path.join(__dirname, './dist')
console.log(_path)
app.use(history())
app.use('/', express.static(_path))
app.use(logger('tiny'))

app.use(
  createProxyMiddleware('/v1', {
    target: 'https://openapi.naver.com',
    changeOrigin: true
  })
)

app.get('/hak', (req, res) => {
  console.log('준비')
  cw.ax().then((v) => {
    console.log(v)
    res.send(v)
  })
})

app.listen(3000, () => {
  console.log(3000 + '에서 서버 동작 완료.')
})
