import axios from "./customize-axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};
const postAddUser = (name, job) => {
  return axios.post("/api/users", { name, job });
}
const putEditUser = (name, job) => {
  return axios.post("/api/users", { name, job });
}
export { fetchAllUser, postAddUser, putEditUser };
