import mainApi from '../../utils/checkResponse';
import {
  getCreatedOrder,
  getCreatedOrderSuccess,
  getDeleteCreatedOrder,
  getCreatedOrderFailed,
  openCreatedOrder
} from '../reducers/index';

export function sendOrder(ingredientsId) {
  return function (dispatch) {
    dispatch(getCreatedOrder())
    mainApi.sendIngredients(ingredientsId)
      .then(res => {
        if (res && res.success) {
          dispatch(getCreatedOrderSuccess(res))
        } else {
          dispatch(getCreatedOrderFailed())
        }
      }).
      then(res => {
        dispatch(getDeleteCreatedOrder())
      }).
      then(res => {
        dispatch(openCreatedOrder())
      }).
      catch(err =>
        dispatch(getCreatedOrderFailed())
      )
  }
}
