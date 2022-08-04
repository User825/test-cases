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

const upSorter = (a, b) => b.id - a.id;
const downSorter = (a, b) => a.id - b.id;;

export const sortUsersArray = ({ usersArray, direction }) => {
  const clonedArray = structuredClone(usersArray);
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

  return collectingList.map(({ id, ...userData }, index) => ({
    id: index + 1,
    ...userData
  }));
}

const getProportionIndexForLengthArr = ({ arrLength, proportion }) => Math.round(arrLength / 10 * proportion);

export const collectGamesList = ({ gamesOriginList, quantityGames }) => {
  const decimalRateProportions = {
    high: 3,
    medium: 0,
    low: 4,
    lowest: 3,
  };
  let gamesList = [];

  if (gamesOriginList.length === quantityGames) {
    gamesList = structuredClone(gamesOriginList);
  };

  if (gamesOriginList.length > quantityGames) {
    gamesList = gamesOriginList.slice(0, quantityGames)
  };

  const arrLength = gamesList.length;
  
  const highIndex = getProportionIndexForLengthArr({ arrLength, proportion: decimalRateProportions.high }) - 1;
  const mediumIndex = highIndex + getProportionIndexForLengthArr({ arrLength, proportion: decimalRateProportions.medium });
  const lowIndex = mediumIndex + getProportionIndexForLengthArr({ arrLength, proportion: decimalRateProportions.low });
  const lowestIndex = lowIndex + getProportionIndexForLengthArr({ arrLength, proportion: decimalRateProportions.lowest });

  return gamesList.map((game, index) => {
    let rate;

    if (index <= highIndex) {
      rate = 'high'
    }

    if (index > highIndex && index <= mediumIndex) {
      rate = 'medium'
    }

    if (index > mediumIndex && index <= lowIndex) {
      rate = 'low'
    }

    if (index > lowIndex && index <= lowestIndex) {
      rate = 'lowest'
    }

    return {
      rate,
      ...game,
    }
  })
}

