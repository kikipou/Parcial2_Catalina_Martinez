import { reducer } from "./reducer"
import { AppState, Observer } from "../types/store";
import Storage from "../utils/storage";
import { CartItem, Product } from "./products";

export type AppState = {
    screen: string,
    cart: CartItem[];
    products: Product[];
};

export type Observer = { render: () => void } & HTMLElement;

export enum Actions {
    ADD_TO_CART = 'ADD_TO_CART',
    GET_PRODUCTS = 'GET_PRODUCTS',
};