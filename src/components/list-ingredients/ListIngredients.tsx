import React, { FC } from 'react';
import PropTypes from 'prop-types';
import Ingredient from '../ingredient/Ingredient';
import style from './ListIngredients.module.css'
import { IListIngredients } from '../../utils/types';
// import ingredientsPropTypes from '../../utils/types';

const ListIngredients: FC<IListIngredients> = ({ ingredients, title , id}) => {
   return (
      <>
         <div className='text text_type_main-medium mt-10 mb-6' id={id}>{title}</div>

         <div className={style.colomn}>
            {
               ingredients.map((element) => {
                  return (
                     <Ingredient ingredient={element} key={element._id} />
                  )
               })
            }
         </div>
      </>
   )
}

// ListIngredients.propTypes = {
//    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
//    title: PropTypes.string.isRequired,
//    id: PropTypes.string.isRequired,
// }

export default ListIngredients;