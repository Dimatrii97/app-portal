import server from './http'
export async function all() {
  const { data } = await server.get('/api/tasks')
  return data
}
export async function byId(id) {
  const data = await server.get('/api/task/id', { id })
  return data
}
