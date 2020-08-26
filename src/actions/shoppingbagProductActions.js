import {
  SHOPPINGBAG_INIT_PRODUCT,
  SHOPPINGBAG_CHANGE_PRODUCT,
} from '../types/shoppingbagProductTypes';

export function shoppingbagInitProduct(productsShoppingbag) {
  return { type: SHOPPINGBAG_INIT_PRODUCT, payload: { productsShoppingbag } };
}

export function shoppingbagChangeProduct(productItem) {
  return { type: SHOPPINGBAG_CHANGE_PRODUCT, payload: { productItem } };
}