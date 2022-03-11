import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as generateUniqueId } from 'uuid';
import { IIngredient } from '../../utils/types';


interface ICounterState {
   ingredients: Array<object>;
   constructorIngredients: Array<object>;
   createdOrder: object | null;
   feedRequest: boolean;
   feedFailed: boolean;
   orderFailed: boolean;
   orderRequest: boolean;
}

const initialState: ICounterState = {
   ingredients: [],
   constructorIngredients: [],
   createdOrder: null,

   feedRequest: false,
   feedFailed: false,

   orderFailed: false,
   orderRequest: false,
}

const ingredientSlice = createSlice({
   name: 'burger',
   initialState,
   reducers: {
      //получение ингредиентов от сервира
      getFeedItem(state) {
         state.feedRequest = true;
         state.feedFailed = false;
      },
      getListIngredients(state, action: PayloadAction<Array<object>>) {
         state.ingredients = action.payload;
         state.feedRequest = false;
      },
      getListIngredientsFailed(state) {
         state.feedFailed = true;
         state.feedRequest = false;
      },
      //отправка заказа на сервер
      getCreatedOrder(state) {
         state.orderRequest = true;
         state.orderFailed = false;
      },
      getCreatedOrderSuccess(state, action: PayloadAction<object | null>) {
         state.orderRequest = false;
         state.createdOrder = action.payload;
      },
      getCreatedOrderFailed(state) {
         state.orderRequest = false;
         state.orderFailed = true;
      },
      getDeleteCreatedOrder(state) {
         state.constructorIngredients = [];
      },
      //добавление ингредиента
      draggingAnElement(state, action: PayloadAction<Array<IIngredient>>) {
         const modifiedIngredient = action.payload.map((ingredient) => {
            const ingredientCopy = Object.assign({}, ingredient);
            ingredientCopy.uuid = generateUniqueId();
            return ingredientCopy;
         });
         state.constructorIngredients = modifiedIngredient;
         
      },
      //для dnd
      sortConstructorIngredients(state, action: PayloadAction<Array<IIngredient>>) {
         state.constructorIngredients = action.payload;
      },
      //удаление ингредиента
      deleteIngredient(state, action: PayloadAction<number>) {
         state.constructorIngredients = state.constructorIngredients.filter((item, index) => index !== action.payload);
      }
   }
})

export const {
   getCreatedOrder,
   getCreatedOrderSuccess,
   getCreatedOrderFailed,
   getDeleteCreatedOrder,
   sortConstructorIngredients,
   deleteIngredient,
   draggingAnElement,
   getFeedItem,
   getListIngredients,
   getListIngredientsFailed
} = ingredientSlice.actions;

export default ingredientSlice.reducer