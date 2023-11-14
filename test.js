const express = require("express")
const path = require("path")
const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/api', createProxyMiddleware({ target: 'http://10.100.200.16:8000', changeOrigin: true }))
app.use(express.static(path.join(__dirname, "dist")))


app.all("/*", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.listen(8082)