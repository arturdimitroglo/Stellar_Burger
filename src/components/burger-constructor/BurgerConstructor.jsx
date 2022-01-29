import React from 'react';
import style from './BurgerConstructor.module.css';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import img from '../../images/bun-02.png';
import Modal from '../modal/Modal.jsx';
import OrderDetails from '../order-details/OrderDetails.jsx';
import { useDispatch, useSelector } from 'react-redux';
import PressureArea from '../pressure-area/PressureArea';
import uuid from 'react-uuid';
import {
   getCreatedOrder,
   sendingDataFailed,
   openCreatedOrder,
} from '../../services/index';


const BurgerConstructor = () => {

   const { 
      constructorIngredients,
      modalCreatedOrderActive, 
      postFeedFailed, 
      createdOrder ,
      ingredients
   } = useSelector(state => state.counterSlice)
   
   const dispatch = useDispatch()

   const bun = constructorIngredients.find((item) => item.type === 'bun');

   const URL = "https://norma.nomoreparties.space/api/orders";
   const ingredientsToSend = ingredients.map(item => {
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
            <div className='m-4'>
               {constructorIngredients.length > 0 ?
                  (<>
                     <div className='ml-20'>
                        <ConstructorElement
                           type="top"
                           isLocked={true}
                           text={`${bun.name} (верх)`}
                           price={bun.price}
                           thumbnail={bun.image}
                        />
                     </div>

                     <ul className={style.elements}>
                        {constructorIngredients.map((item) => {
                           if (item.type === 'bun') {
                              return null
                           }
                           return (
                              <li key={uuid()} className='m-4'>
                                 <DragIcon type="primary" />
                                 <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                 />
                              </li>
                           )
                        })
                        }
                     </ul>

                     <div className='ml-20'>
                        <ConstructorElement
                           type="bottom"
                           isLocked={true}
                           text={`${bun.name} (низ)`}
                           price={bun.price}
                           thumbnail={bun.image}
                        />
                     </div>
                  </>)
                  : <PressureArea />
               }
            </div>

            <div className={`${style.info} mt-10 mr-4`}>
               <div className={`${style.price} mr-10`}>
                  <p className="text text_type_digits-medium m-2">10000</p>
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