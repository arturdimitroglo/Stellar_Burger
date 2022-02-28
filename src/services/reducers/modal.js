import { createSlice } from '@reduxjs/toolkit';
import { v4 as generateUniqueId } from 'uuid';

const initialState = {
   actualIngredient: {},
   modalCreatedOrderActive: false,
   modalIngredientDetailsActive: false,
}

const modalSlice = createSlice({
   name: 'burger',
   initialState,
   reducers: {
      //работа с модальным окном заказа
      openCreatedOrder(state, action) {
         state.modalCreatedOrderActive = true;
      },
      closeCreatedOrder(state) {
         state.modalCreatedOrderActive = false;
      },
      
      //работа с модальным окном подробностей ингредиента
      openIngredientDetails(state, action) {
         state.actualIngredient = action.payload;
         state.modalIngredientDetailsActive = true;
      },
      closeIngredientDetails(state) {
         state.modalIngredientDetailsActive = false;
      },
      
   }
})

export const {
   openCreatedOrder,
   closeCreatedOrder,
   closeIngredientDetails,
   openIngredientDetails,
} = modalSlice.actions

export default modalSlice.reducer