/* eslint-disable no-unused-vars */
import io from 'socket.io-client'
import * as Token from '@/utils/token'
const accessToken = Token.getAccessToken()
const socket = io('http://localhost:5000', {
  query: {
    token: accessToken
  }
})

// export function connect() {
//   socket.connect()
// }

export function subscribe(eventName, clb) {
  socket.on(eventName, clb)
}

export function emit(eventName, payload) {
  socket.emit(eventName, payload)
}
export function unsubscribe(eventName, payload) {
  socket.off(eventName, payload)
}

subscribe('SetNewMess', () => {
  console.log('модуль')
})
