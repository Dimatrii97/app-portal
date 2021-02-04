import Vue from 'vue'
// http://localhost:5000
export async function getAll() {
  const articles = await Vue.http.get('/api/news').then(res => res.json())
  return articles
}
