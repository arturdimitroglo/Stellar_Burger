import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   ingredients: [],
   constructorIngredients: [],
   actualIngredient: {},
   createdOrder: {},

   feedRequest: false,
   feedFailed: false,

   modalCreatedOrderActive: false,
   postFeedFailed: false,

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
      getCreatedOrder(state, action) {
         state.createdOrder = action.payload;
      },
      sendingDataFailed(state) {
         state.postFeedFailed = true;
         state.modalCreatedOrderActive = true;
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
      }
   }
})

export const {
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