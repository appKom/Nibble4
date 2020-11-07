import { Product } from "types/inventory";
import { User } from "types/user";

export enum ActionTypes {
  SET_USER = "SET_USER",
  LOGOUT_USER = "LOGOUT_USER",
  SET_INVENTORY = "SET_INVENTORY",
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  EMPTY_CART = "EMPTY_CART",
  SET_CATEGORY = "SET_CATEGORY",
}

type SetUserAction = { type: ActionTypes.SET_USER; payload: User };
type LogoutUserAction = { type: ActionTypes.LOGOUT_USER };
type SetInventoryAction = {
  type: ActionTypes.SET_INVENTORY;
  payload: Product[];
};

type SetCategoryAction = {
  type: ActionTypes.SET_CATEGORY;
  payload: string;
};

export type Action =
  | SetUserAction
  | LogoutUserAction
  | SetInventoryAction
  | SetCategoryAction;

export const setUser = (user: User): SetUserAction => ({
  type: ActionTypes.SET_USER,
  payload: user,
});
export const logoutUser = (): LogoutUserAction => ({
  type: ActionTypes.LOGOUT_USER,
});
export const setInventory = (inventory: Product[]): SetInventoryAction => ({
  type: ActionTypes.SET_INVENTORY,
  payload: inventory,
});
export const addToCart = (id: number) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: id,
});
export const removeFromCart = (id: number) => ({
  type: ActionTypes.REMOVE_FROM_CART,
  payload: id,
});
export const setCategory = (id: string): SetCategoryAction => ({
  type: ActionTypes.SET_CATEGORY,
  payload: id,
});

export const emptyCart = () => ({ type: ActionTypes.EMPTY_CART });
