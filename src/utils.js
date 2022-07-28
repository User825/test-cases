export const shuffle = (array) => {
  const clonedArray = structuredClone(array);

  let currentIndex = clonedArray.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [clonedArray[currentIndex], clonedArray[randomIndex]] = [
      clonedArray[randomIndex], clonedArray[currentIndex]];
  }

  return clonedArray;
}

const upSorter = (a,b) => b.id - a.id;
const downSorter = (a,b) => a.id - b.id;;

export const sortUsersArray = ({ usersArray, direction }) => {
  const clonedArray =  structuredClone(usersArray);
  const sorterFunc = direction === 'up' ? upSorter : downSorter;

  return clonedArray.sort(sorterFunc);
}

export const collectUsersList = ({ usersOriginList, quantityUsers }) => {
  if (usersOriginList.length === quantityUsers) return usersOriginList;

  if (usersOriginList.length > quantityUsers) return usersOriginList.slice(0, quantityUsers - 1);

  const collectingList = [];
  let multiplier = Math.round(quantityUsers / usersOriginList.length);

  while (multiplier !== 0) {
    collectingList.push(...usersOriginList);
    multiplier--;
  }

  return collectingList.map(({id, ...userData}, index) => ({
    id: index + 1,
    ...userData
  }));
}
