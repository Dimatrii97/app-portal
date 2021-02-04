import server from './http'
export async function last() {
  const data = await server.get('/api/messages/last')
  return data
}
export async function messages() {
  //TODO: socket, id, offset
  const data = await server.get('/api/messages/')
  return data
}
