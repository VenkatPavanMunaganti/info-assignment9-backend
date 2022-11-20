const app = require("./api/app")
const http = require("http")
const server = http.createServer(app)

server.listen(5000, () => { "App started" })