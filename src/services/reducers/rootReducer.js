import { combineReducers } from 'redux';
import userSlice from './user';
import ingredientSlice from './ingredient';
import modalSlice from './modal'

export const rootReducer = combineReducers({
   userSlice,
   ingredientSlice,
   modalSlice,
});