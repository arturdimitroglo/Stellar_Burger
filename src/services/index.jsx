import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
   ingredients: [],
   constructorIngredients: [],
   actualIngredient: {},
   createdOrder: {},
   
   feedRequest: false,
   feedFailed: false,
}

const counterSlice = createSlice({
   name: 'burger',
   initialState,
   reducers: {
      getFeedItem(state) {
         state.feedRequest = true;
         state.feedFailed = false;
      },
      getListIngredients(state, action) {
         state.ingredients = action.payload;
         state.feedRequest = false;
      },
      getListIngredientsFailed(state){
         state.feedFailed = true;
         state.feedRequest = false;
      }
   }
})

export const { getFeedItem, getListIngredients, getListIngredientsFailed } = counterSlice.actions
export default counterSlice.reducer