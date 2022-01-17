import React from 'react';
import PropTypes from 'prop-types';
import style from './BurgerConstructor.module.css'
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import img from '../../images/bun-02.png';
import Modal from '../modal/Modal.jsx';
import OrderDetails from '../order-details/OrderDetails.jsx';

const BurgerConstructor = ({ data }) => {

   const [orderDetails, setOrderDetails] = React.useState(false);

   const openOrderDetails = () => {
      setOrderDetails(true);
   }

   const closeOrderDetails = () => {
      setOrderDetails(false);
   }

   return (
      <>
         <div className="mt-25">
            <div className='m-4'>
               <div className='ml-20'>
                  <ConstructorElement
                     type="top"
                     isLocked={true}
                     text="Краторная булка N-200i (верх)"
                     price={1255}
                     thumbnail={img}
                  />
               </div>
               <ul className={style.elements}>
                  {
                     data.map((item, index) => {
                        if (item.type === 'bun') {
                           return null
                        }
                        return (
                           <li key={index} className='m-4'>
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
                     text="Краторная булка N-200i (низ)"
                     price={1255}
                     thumbnail={img}
                  />
               </div>
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
         {orderDetails &&
            <Modal title='' onClick={closeOrderDetails}>
               <OrderDetails />
            </Modal >
         }
      </>
   )
}

BurgerConstructor.propTypes = {
   data: PropTypes.arrayOf(PropTypes.object)
}

export default BurgerConstructor;