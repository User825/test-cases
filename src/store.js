import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools';

import { fetchUsers } from './api';
import { collectUsersList, shuffle, sortUsersArray } from './utils';

const USERS_QUANTITY = 1000;

const useStore = create((set) => ({
  users: [],
  getUsers: async () =>{
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

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore);
}

export default useStore;
