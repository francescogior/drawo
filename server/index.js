const server = require('http').createServer()
const io = require('socket.io')(server)

io.on('connection', (client) => {
  client.on('data', (data) => {
    client.broadcast.emit('data', data)
  })
})

server.listen(8001)
