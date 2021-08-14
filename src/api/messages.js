import server from './http'
export async function last() {
  const { data } = await server.get('/api/messages/last')
  return data
}
export function getMessages(interlocutorId, offset) {
  return server
    .post('/api/messages/chat', {
      interlocutorId,
      offset
    })
    .then(res => res.data)
}
