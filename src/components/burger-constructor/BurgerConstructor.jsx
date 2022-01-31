import React, { useMemo } from 'react';
import style from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal.jsx';
import OrderDetails from '../order-details/OrderDetails.jsx';
import { useDispatch, useSelector } from 'react-redux';
import AddedIngredient from '../added-ingredient/AddedIngredient.jsx';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { sendOrder } from '../../services/actions/sendOrder';
import { useDrop } from "react-dnd";
import { sortConstructorIngredients, closeCreatedOrder } from '../../services/reducers/index';

const BurgerConstructor = ({ onDropHandler }) => {

   const { constructorIngredients, modalCreatedOrderActive, } = useSelector(state => state.counterSlice)
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

   const bun = constructorIngredients.find((item) => item.type === 'bun');
   const bunHandler = (constructorIngredients, property, trueValue, falseValue) => constructorIngredients.find(ingredient => ingredient.type === 'bun') ? `${(constructorIngredients.find(ingredient => ingredient.type === 'bun'))[property]} ${trueValue}` : falseValue

   const openOrderDetails = () => {
      const ingredientsId = constructorIngredients.map(ingredient => ingredient._id)
      dispatch(sendOrder(ingredientsId))
   }

   const onClose = () => {
      dispatch(closeCreatedOrder());
   }

   const moveCard = (dragIndex, hoverIndex) => {
      const dragCard = constructorIngredients[dragIndex];
      const newConstructorIngredients = [...constructorIngredients];
      newConstructorIngredients.splice(dragIndex, 1);
      newConstructorIngredients.splice(hoverIndex, 0, dragCard);
      dispatch(sortConstructorIngredients(newConstructorIngredients));
   }

   return (
      <DndProvider backend={HTML5Backend}>
         <div className="mt-25" ref={dropRef}>
            {(constructorIngredients.length > 0 && bun)
               ? <div className='ml-20'>
                  <ConstructorElement
                     type="top"
                     isLocked={true}
                     text={bunHandler(constructorIngredients, 'name', '(верх)', 'Выберите булку')}
                     price={bunHandler(constructorIngredients, 'price', '', '0')}
                     thumbnail={bunHandler(constructorIngredients, 'image', '', '')}
                  />
               </div>
               : <div className={`${style.bunTop} ml-20 mt-4 mb-4`}>
                  <p className="text text_type_main-large">
                     Добавте булку
                  </p>
               </div>
            }

            <ul className={`${style.elements}`}>
               {constructorIngredients.map((item, index) =>
                  item.type !== 'bun' && <AddedIngredient key={item.uuid} moveCard={moveCard} index={index} ingredient={item} id={`${item._id}${index}`} />
               )}
            </ul>

            {(constructorIngredients.length > 0 && bun)
               ? <div className='ml-20'>
                  <ConstructorElement
                     type="bottom"
                     isLocked={true}
                     text={bunHandler(constructorIngredients, 'name', '(низ)', 'Выберите булку')}
                     price={bunHandler(constructorIngredients, 'price', '', '0')}
                     thumbnail={bunHandler(constructorIngredients, 'image', '', '')}
                  />
               </div>
               : <div className={`${style.bunBot} ml-20 mt-4 mb-4`}>
                  <p className="text text_type_main-large">
                     Добавте булку
                  </p>
               </div>
            }

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

         {modalCreatedOrderActive &&
            <Modal onClick={onClose} title=''>
               <OrderDetails />
            </Modal >
         }
      </DndProvider>
   )
}
BurgerConstructor.propTypes = {
   onDropHandler: PropTypes.func.isRequired,
};

export default BurgerConstructor;