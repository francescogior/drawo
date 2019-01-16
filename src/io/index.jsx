import socket from 'socket.io-client'

const io = socket(process.env.NODE_ENV === 'development' ? 'localhost:8001' : '//io.drawo.sh')

export const onData = (onDataFn) => {
  io.on('data', (data) => {
    onDataFn(data)
  })
}

export const emit = (data) => {
  io.emit('data', data)
}

