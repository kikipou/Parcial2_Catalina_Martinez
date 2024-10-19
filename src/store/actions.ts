import { Product } from '../types/product';
import { Actions } from '../types/store';
import { Screens } from '../types/store';

export const addToCart = (payload: Product) => {
    return {
        action: Actions.ADD_TO_CART,
        payload: payload,
    };
};

export const getProductsState = async () => {
    const data = await getProducts()
    return {
        action: Actions.GET_PRODUCTS,
        payload: data,
    };
};

