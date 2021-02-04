import server from './http'
// TODO: Прописать пути
export async function deleteUser() {
  const data = await server.get('/api/messages/last')
  return data
}
export async function createUser() {
  const data = await server.get('/api/messages/')
  return data
}
