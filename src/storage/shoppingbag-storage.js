export function changeShoppingbag(productItem) {
  let productList = JSON.parse(localStorage.getItem('shoppingbagProduct'));
  const indexProducts = productList.findIndex((item) => item.id === productItem.id && item.size === productItem.size);
  if (indexProducts !== -1) {
    productList = productList.map((product) => {
      if (product.id === productItem.id) {
        return {
          ...product,
          amount: Number(product.amount) + Number(productItem.amount),
        };
      } else {
        return { ...product };
      }
    });
  } else {
    productList.push(productItem);
  }
  localStorage.setItem('shoppingbagProduct', JSON.stringify(productList));
  return productList;
}

export function removeShoppingbag(idAndSize) {
  let productList = JSON.parse(localStorage.getItem('shoppingbagProduct'));
  productList = productList.filter((item) => `${item.id}${item.size}` !== idAndSize);
  localStorage.setItem('shoppingbagProduct', JSON.stringify(productList));
  return productList;
}

export function clearShoppingbag() {
  localStorage.setItem('shoppingbagProduct', JSON.stringify([]));
  return [];
}

export function getLastShoppingbag() {
  return JSON.parse(localStorage.getItem('shoppingbagProduct'));
}