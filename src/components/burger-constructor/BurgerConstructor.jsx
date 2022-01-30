import React, { useMemo } from 'react';
import style from './BurgerConstructor.module.css';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal.jsx';
import OrderDetails from '../order-details/OrderDetails.jsx';
import { useDispatch, useSelector } from 'react-redux';
import PressureArea from '../pressure-area/PressureArea';

import { useDrop } from "react-dnd";
import {
   getCreatedOrder,
   sendingDataFailed,
   openCreatedOrder,
   deleteIngredient,
} from '../../services/index';

const BurgerConstructor = ({ onDropHandler }) => {

   const {
      constructorIngredients,
      modalCreatedOrderActive,
      postFeedFailed,
   } = useSelector(state => state.counterSlice)

   const dispatch = useDispatch()

   const sum = useMemo(() =>
      constructorIngredients.reduce((acc, cur) => cur.type === 'bun' ? acc + (cur.price * 2) : acc + cur.price, 0)
      , [constructorIngredients])

   const [, dropRef] = useDrop({
      accept: 'ingredient',
      drop(item) {
         onDropHandler(item);
      },
   });

   const onClose = (elem) => {
      const del = constructorIngredients.indexOf(elem);
      dispatch(deleteIngredient(del))
   }

   const bun = constructorIngredients.find((item) => item.type === 'bun');

   const URL = "https://norma.nomoreparties.space/api/orders";
   const ingredientsToSend = constructorIngredients.map(item => {
      return item._id
   })

   const openOrderDetails = () => {
      fetch(`${URL}`, {
         method: 'POST',
         body: JSON.stringify({
            ingredients: ingredientsToSend
         }),
         headers: {
            'Content-type': 'application/json'
         },
      }).then(res => {
         return res.json()
      }).then(res => {
         if (res && res.success) {
            dispatch(getCreatedOrder(res))
         } else {
            dispatch(sendingDataFailed())
         }
      }).then(res => {
         dispatch(openCreatedOrder())
      }).
         catch(err =>
            dispatch(sendingDataFailed())
         )
   }

   return (
      <>
         <div className="mt-25">
            <div className='m-4' ref={dropRef}>
               {constructorIngredients.length > 0 ?
                  (<>
                     {bun ?
                        <div className='ml-20'>
                           <ConstructorElement
                              key={bun.key}
                              type="top"
                              isLocked={true}
                              text={`${bun.name} (верх)`}
                              price={bun.price}
                              thumbnail={bun.image}
                           />
                        </div> :
                        <div className={`${style.bunTop} ml-20 mt-4 mb-4`}>
                           <p className="text text_type_main-large">
                              Добавте булку
                           </p>
                        </div>
                     }
                     <ul className={style.elements}>
                        {constructorIngredients.map((item) => {
                           if (item.type === 'bun') {
                              return (
                                 <div></div>
                              )
                           }
                           else {
                              return (
                                 <li key={item.uuid} className='m-4'>
                                    <DragIcon type="primary" />
                                    <ConstructorElement
                                       text={item.name}
                                       price={item.price}
                                       thumbnail={item.image}
                                       handleClose={(e) => onClose(item)}
                                    />
                                 </li>
                              )
                           }
                        })
                        }
                     </ul>

                     {bun ?
                        <div className='ml-20'>
                           <ConstructorElement
                              key={bun.key}
                              type="bottom"
                              isLocked={true}
                              text={`${bun.name} (низ)`}
                              price={bun.price}
                              thumbnail={bun.image}
                           />
                        </div> :
                        <div className={`${style.bunBot} ml-20 mt-4 mb-4`}>
                           <p className="text text_type_main-large">
                              Добавте булку
                           </p>
                        </div>
                     }
                  </>)
                  : <PressureArea />
               }
            </div>

            <div className={`${style.info} mt-10 mr-4`}>
               <div className={`${style.price} mr-10`}>
                  <p className="text text_type_digits-medium m-2">{sum}</p>
                  <CurrencyIcon type="primary" />
               </div>
               <div onClick={openOrderDetails}>
                  <Button type="primary" size="medium">
                     Оформить заказ
                  </Button>
               </div>
            </div>
         </div>
         {!postFeedFailed && modalCreatedOrderActive &&
            <Modal title=''>
               <OrderDetails />
            </Modal >
         }
         {postFeedFailed && modalCreatedOrderActive &&
            <Modal title=''>
               <p className="text text_type_main-default text_color_inactive ">
                  ОШИБКА! Перезагрузите страницу и попробуйте снова
               </p>
            </Modal >
         }
      </>
   )
}

export default BurgerConstructor;