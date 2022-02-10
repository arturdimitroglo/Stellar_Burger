import { createSlice } from '@reduxjs/toolkit';
import { v4 as generateUniqueId } from 'uuid';

const initialState = {
   ingredients: [],
   constructorIngredients: [],
   actualIngredient: {},
   createdOrder: {},

   orderFailed: false,
   orderRequest: false,

   feedRequest: false,
   feedFailed: false,

   modalCreatedOrderActive: false,

   current: 'bun',
   modalIngredientDetailsActive: false,
}

const counterSlice = createSlice({
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
      //работа с модальным окном заказа
      openCreatedOrder(state, action) {
         state.modalCreatedOrderActive = true;
      },
      closeCreatedOrder(state) {
         state.modalCreatedOrderActive = false;
      },
      //активный Tab
      currentActive(state, action) {
         state.current = action.payload;
      },
      //работа с модальным окном подробностей ингредиента
      openIngredientDetails(state, action) {
         state.modalIngredientDetailsActive = true;
         state.actualIngredient = action.payload;
      },
      closeIngredientDetails(state) {
         state.modalIngredientDetailsActive = false;
         state.actualIngredient = {};
      },
      //добавление ингредиента
      draggingAnElement(state, action) {
         const modifiedIngredient = action.payload.map((ingredient) => {
            const ingredientCopy = Object.assign({}, ingredient);
            ingredientCopy.uuid = generateUniqueId();
            return ingredientCopy;
         });
         state.constructorIngredients = modifiedIngredient

      },
      //для dnd
      sortConstructorIngredients(state, action) {
         state.constructorIngredients = action.payload
      },
      //удаление ингредиента
      deleteIngredient(state, action) {
         state.constructorIngredients = state.constructorIngredients.filter((item, index) => index !== action.payload)
      }
   }
})

export const {
   getCreatedOrderSuccess,
   getCreatedOrderFailed,
   getDeleteCreatedOrder,
   sortConstructorIngredients,
   deleteIngredient,
   deleteBun,
   draggingAnElement,
   openCreatedOrder,
   closeCreatedOrder,
   getCreatedOrder,
   sendingDataFailed,
   closeIngredientDetails,
   openIngredientDetails,
   currentActive,
   getFeedItem,
   getListIngredients,
   getListIngredientsFailed
} = counterSlice.actions
export default counterSlice.reducer