import server from './http'
export async function get() {
  const { data } = await server.get('/api/news')
  return data
}
