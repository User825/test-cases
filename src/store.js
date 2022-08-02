import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools';

import { fetchGames, fetchUsers } from './api';
import { collectGamesList, collectUsersList, shuffle, sortUsersArray } from './utils';

const USERS_QUANTITY = 1000;
const GAMES_QUANTITY = 25;

export const useUsersStore = create((set) => ({
  users: [],
  getUsers: async () => {
    const responseUsers = await fetchUsers();

    set(() => ({ users: collectUsersList({ usersOriginList: responseUsers, quantityUsers: USERS_QUANTITY })}))
  },
  sortUsersUp: () => set(state => ({
    users: sortUsersArray({ usersArray: state.users, direction: 'up'})
  })),
  sortUsersDown: () => set(state => ({
    users: sortUsersArray({ usersArray: state.users, direction: 'down'})
  })),
  shuffleUsers: () => set(state => ({
    users: shuffle(state.users),
  }))
}));

export const useGameStore = create((set) => ({
  games: [],
  getGames: async () => {
    const responseGames = await fetchGames();

    set(() => ({ games: collectGamesList({ gamesOriginList: responseGames, quantityGames: GAMES_QUANTITY }) }))
  }
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useUsersStore);
  mountStoreDevtool('Store', useGameStore);
}


