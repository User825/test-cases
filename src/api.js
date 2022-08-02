import axios from "axios";

export const fetchUsers = () => {
  const endpoint = 'https://dummyjson.com/users?limit=100&select=firstName,lastName,email,image';
  
  return axios.get(endpoint).then(resp => resp.data.users);
}

export const fetchGames = () => {
  const endpoint = 'https://www.freetogame.com/api/games?platform=pc';

  return axios.get(endpoint).then(resp => resp.data);
}
