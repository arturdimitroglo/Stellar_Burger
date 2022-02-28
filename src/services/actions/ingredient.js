import mainApi from '../../utils/checkResponse';
import {
   getFeedItem,
   getListIngredients,
   getListIngredientsFailed,
} from '../reducers/ingredient';

export function getFeed() {
   return function (dispatch) {
      dispatch(getFeedItem())
      mainApi.getIngredients()
         .then((ingredientsData) => {
            if (ingredientsData) {
               dispatch(getListIngredients(ingredientsData.data))
            }
         })
         .catch((err) =>
            dispatch(getListIngredientsFailed())
         );

   }
}
