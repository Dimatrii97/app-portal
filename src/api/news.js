import Vue from "vue";
export async function getAll() {
  const articles = await Vue.http
    .get("http://localhost:5000/api/news")
    .then(res => res.json());
  return articles;
}
