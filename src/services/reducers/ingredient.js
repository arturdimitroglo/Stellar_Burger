import { createSlice } from '@reduxjs/toolkit';
import { v4 as generateUniqueId } from 'uuid';

const initialState = {
   ingredients: [],
   constructorIngredients: [],
   createdOrder: {},
   
   feedRequest: false,
   feedFailed: false,

   current: 'bun',

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
      getListIngredients(state, action) {
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
      getCreatedOrderSuccess(state, action) {
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

      //активный Tab
      currentActive(state, action) {
         state.current = action.payload;
      },
      //добавление ингредиента
      draggingAnElement(state, action) {
         const modifiedIngredient = action.payload.map((ingredient) => {
            const ingredientCopy = Object.assign({}, ingredient);
            ingredientCopy.uuid = generateUniqueId();
            return ingredientCopy;
         });
         state.constructorIngredients = modifiedIngredient;
      },
      //для dnd
      sortConstructorIngredients(state, action) {
         state.constructorIngredients = action.payload;
      },
      //удаление ингредиента
      deleteIngredient(state, action) {
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
   currentActive,
   getFeedItem,
   getListIngredients,
   getListIngredientsFailed
} = ingredientSlice.actions;

export default ingredientSlice.reducer