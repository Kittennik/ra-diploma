import {
  SHOPPINGBAG_INIT_PRODUCT,
  SHOPPINGBAG_CHANGE_PRODUCT,
} from '../types/shoppingbagProductTypes';

const initialState = {
  products: [],
};

export default function shoppingbagProductReducer(state = initialState, action) {
  switch (action.type) {
    case SHOPPINGBAG_INIT_PRODUCT: {
      const { productsShoppingbag } = action.payload;
      return {
        products: productsShoppingbag,
      };
    }
    case SHOPPINGBAG_CHANGE_PRODUCT: {
      
      const { productItem } = action.payload;
      console.log(productItem);
      return {
        products: productItem,
      };
    }
    default:
      return { ...state };
  }
}