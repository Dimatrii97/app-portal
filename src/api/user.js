import server from './http'
export async function login(payload) {
  const data = await server.post('api/user/auth', payload)
  return data
}
export async function current() {
  const data = await server.get('/api/user')
  return data
}
export async function usersDepartment() {
  const { data } = await server.get('/api/users/deparment')
  return data
}
export function getUserById(id) {
  return server
    .get('/api/user/id', {
      params: { id }
    })
    .then(res => res.data)
}
