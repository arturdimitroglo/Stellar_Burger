import React from 'react';
import { useSelector } from 'react-redux';
import {
   getCreatedOrder,
   sendingDataFailed,
} from '../index';

const URL = "https://norma.nomoreparties.space/api/orders";
// const { ingredients } = useSelector(state => state.counterSlice)
//    const a = ingredients.map(item => {
//       return item._id
//    })
// export function SendingPost() {
//    return function (dispatch) {
//       fetch(`${URL}`, {
//          method: 'POST',
//          body: JSON.stringify({
//             ingredients: a
//          }),
//          headers: {
//             'Content-type': 'application/json'
//          },
//       }).then(res => {
//          return res.json()
//       }).then(res => {
//          console.log(res)
//       }).then(res => {
//          if (res && res.success) {
//             dispatch(getCreatedOrder(res.data))
//          } else {
//             dispatch(sendingDataFailed())
//          }
//       }).catch(err =>
//          dispatch(sendingDataFailed())
//       )
//    }
// }