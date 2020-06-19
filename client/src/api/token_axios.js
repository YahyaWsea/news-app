import axios from 'axios'

const token = sessionStorage.getItem("token");
console.log("Token .. ,", token);
const headers = {}
if (token) {
    headers.Authorization = `bearer ${token}`;
}
// console.log(headers);
export default axios.create({
    headers
});