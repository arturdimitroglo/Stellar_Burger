import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { openIngredientDetails } from '../../services/index';
import { useDrag } from "react-dnd";
import { draggingAnElement, deleteBun } from '../../services/index';
import { v4 as generateUniqueId } from 'uuid';

const Ingredient = ({ ingredient }) => {
   const { image, price, name, _id } = ingredient;
   const {
      constructorIngredients,
      ingredients
   } = useSelector(state => state.counterSlice)

   const dispatch = useDispatch()

   const onClick = (elem) => {
      dispatch(openIngredientDetails(elem))
   }

   const [{ isDrag }, dragRef] = useDrag({
      type: "ingredient",
      item: { _id },
      collect: monitor => ({
         isDrag: monitor.isDragging(),
      })
   });

   let counter = 0;

   constructorIngredients.forEach(ingredient => ingredient.name === name && (ingredient.type === 'bun' ? counter += 2 : counter += 1))

   const handleChoseIngredient = (e) => {
      e.preventDefault()
      const targetIngredient = Object.assign({}, ingredients.find(ingredient => ingredient._id === e.currentTarget.dataset.id))
      targetIngredient.uuid = generateUniqueId();
      const selectedBun = constructorIngredients.find(ingredient => ingredient.type === 'bun')

      if (targetIngredient.type === 'bun' && selectedBun) {
         dispatch(deleteBun())
         dispatch(draggingAnElement(targetIngredient));
      } else {
         dispatch(draggingAnElement(targetIngredient));
      }
   }
//
   return (
      <>
         <div className={`${style.item} mt-6 ml-4 mr-3 mb-10`} onContextMenu={handleChoseIngredient} data-id={_id} ref={dragRef} onClick={() => onClick(ingredient)}>
            {counter > 0 && <Counter className={style.count} count={counter} size="default" />}
            <img className={`${style.bun} ml-4 mr-4 mb-1`} src={image} alt="" />
            <div className={`${style.price} mb-1`}>
               <span className="text text_type_digits-default mr-2">{price}</span>
               <CurrencyIcon type="primary" />
            </div>
            <h3 className={`${style.name} text text_type_main-default`}>{name}</h3>
         </div>
      </>

   )
}

Ingredient.propTypes = {
   ingredient: PropTypes.object.isRequired,
}

export default Ingredient;