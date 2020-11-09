import Vue from "vue";
export async function login(value) {
  const { data } = await Vue.http
    .post("http://localhost:5000/api/auth/login", value)
    .then(res => res.json());
  return data;
}
