import axios from "axios";

export const fetchUsers = () => {
  const endpoint = 'https://dummyjson.com/users?limit=100&select=firstName,lastName,email,image';
  
  return axios.get(endpoint).then(resp => resp.data.users);
}
