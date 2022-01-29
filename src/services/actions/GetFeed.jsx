import { getFeedItem, getListIngredients, getListIngredientsFailed } from '..';

const URL = "https://norma.nomoreparties.space/api/ingredients";

export function getFeed() {
   return function (dispatch) {
      dispatch(getFeedItem())
      fetch(`${URL}`, {
         method: "GET",
         headers: {
            'Content-Type': 'application/json'
         }
      }).then(res => {
         return res.json()
      }).then(res => {
         if (res && res.success) {
            dispatch(getListIngredients(res.data))
         } else {
            dispatch(getListIngredientsFailed())
         }
      }).catch(err =>
         dispatch(getListIngredientsFailed())
      )
   }
}