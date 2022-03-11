import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICounterState {
   actualIngredient: object | null;
   modalCreatedOrderActive: boolean;
   modalIngredientDetailsActive: boolean;
}

const initialState: ICounterState = {
   actualIngredient: {},
   
   modalCreatedOrderActive: false,
   modalIngredientDetailsActive: false,
}

const modalSlice = createSlice({
   name: 'burger',
   initialState,
   reducers: {
      //работа с модальным окном заказа
      openCreatedOrder(state) {
         state.modalCreatedOrderActive = true;
      },
      closeCreatedOrder(state) {
         state.modalCreatedOrderActive = false;
      },
      
      //работа с модальным окном подробностей ингредиента
      openIngredientDetails(state, action: PayloadAction<object | null>) {
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