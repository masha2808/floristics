function filterAndSortArray(bouquets, search, category, minPrice, maxPrice, minCount, maxCount, composition, param, increasing) {
  const filteredBouquets = filterArray(bouquets, category, minPrice, maxPrice, minCount, maxCount, composition);
  const sortedArray = sortArray(filteredBouquets, param, increasing);
  return searchByParameter(sortedArray, search);
}

function sortArray(bouquets, param, increasing) {
  const sortedArray = bouquets.slice();
  if (param === 'title' || param === 'sales'
    || param === 'date' || param === 'price') {
    if (increasing) {
      sortedArray.sort((a, b) => {
        if (a[param] < b[param]) {
          return -1;
        }
        if (a[param] > b[param]) {
          return 1;
        }
        return 0;
      });
    } else {
      sortedArray.sort((a, b) => {
        if (a[param] > b[param]) {
          return -1;
        }
        if (a[param] < b[param]) {
          return 1;
        }
        return 0;
      });
    }
  } else {
    console.log(`Incorrect parameter for sorting ${param}`);
  }
  return sortedArray;
}

function filterArray(bouquets, category, minPrice, maxPrice, minCount, maxCount, composition) {
  const filteredArray = [];
  bouquets.forEach((bouquet) => {
    let added = true;
    if (bouquet.category !== category && category !== 'Усі букети') {
      added = false;
    }
    if (parseInt(bouquet.price, 10) < parseInt(minPrice, 10)
      || parseInt(bouquet.price, 10) > parseInt(maxPrice, 10)) {
      added = false;
    }
    if (parseInt(bouquet.flowersCount, 10) < parseInt(minCount, 10)
      || parseInt(bouquet.flowersCount, 10) > parseInt(maxCount, 10)) {
      added = false;
    }
    if (composition.length !== 0) {

      let count = 0;
      composition.forEach((item) => {
        if (bouquet.composition.includes(item)) {
          count += 1;
        }
      });
      if (count === 0) {
        added = false;
      }
    }
    if (added) {
      filteredArray.push(bouquet);
    }
  });
  return filteredArray;
}

function searchByParameter(bouquets, param) {
  const foundUsers = [];
  const paramStr = param.toString();
  bouquets.forEach((bouquet) => {
    if (bouquet.title.toUpperCase().includes(paramStr.toUpperCase())
      || bouquet.price.toString() === paramStr) {
      foundUsers.push(bouquet);
    }
  });
  return foundUsers;
}

function getPages(bouquets) {
  let pages = Math.ceil(bouquets.length / 10);
  if (pages === 0) {
    pages = 1;
  }
  return pages;
}

function getBouquetsPage(bouquets, currentPage) {
  const pageArray = [];
  if (bouquets.length > 0) {
    const firtsIndex = (currentPage - 1) * 10;
    let lastIndex;
    if (firtsIndex + 10 > bouquets.length) {
      lastIndex = bouquets.length;
    } else {
      lastIndex = firtsIndex + 10;
    }
    for (let i = firtsIndex; i < lastIndex; i += 1) {
      pageArray.push(bouquets[i]);
    }
  }
  return pageArray;
}

module.exports = {
  getPages,
  getBouquetsPage,
  filterAndSortArray
};
