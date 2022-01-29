import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import { useDispatch } from 'react-redux';
import { openIngredientDetails } from '../../services/index';


const Ingredient = ({ ingredient, counter }) => {

   const dispatch = useDispatch()

   const onClick = (elem) => {
      dispatch(openIngredientDetails(elem))
   }

   return (
      <>
         <div className={`${style.item} mt-6 ml-4 mr-3 mb-10`} onClick={() => onClick(ingredient)}>
            {counter && <Counter className={style.count} count={counter} size="default" />}
            <img className={`${style.bun} ml-4 mr-4 mb-1`} src={ingredient.image} alt="" />
            <div className={`${style.price} mb-1`}>
               <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
               <CurrencyIcon type="primary" />
            </div>
            <h3 className={`${style.name} text text_type_main-default`}>{ingredient.name}</h3>
         </div>
      </>

   )
}

Ingredient.propTypes = {
   ingredient: PropTypes.object.isRequired,
   counter: PropTypes.number.isRequired,
}

export default Ingredient;