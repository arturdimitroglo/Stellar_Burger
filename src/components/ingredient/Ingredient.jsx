import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import ingredientsPropTypes from '../../utils/types';
import { openIngredientDetails } from '../../services/reducers/modal';
import { draggingAnElement } from '../../services/reducers/ingredient';


const Ingredient = ({ ingredient }) => {
   const { image, price, name, _id } = ingredient;
   const { constructorIngredients, ingredients } = useSelector(state => state.ingredientSlice)

   const dispatch = useDispatch()

   const onClick = (elem) => {
      dispatch(openIngredientDetails(elem))
   }

   const [, dragRef] = useDrag({
      type: "ingredient",
      item: { _id },
      collect: monitor => ({
         isDrag: monitor.isDragging(),
      })
   });

   let counter = 0;

   constructorIngredients.forEach(ingredient => ingredient.name === name && (ingredient.type === 'bun' ? counter += 2 : counter += 1))

   const handleChoseIngredient = (e) => {
      e.preventDefault();
      const targetIngredient = ingredients.find(
         (ingredient) => ingredient._id === e.currentTarget.dataset.id
      );
      const selectedBun = constructorIngredients.find(
         (ingredient) => ingredient.type === "bun"
      );
      const selectedBunIndex = constructorIngredients.indexOf(selectedBun);

      if (targetIngredient.type === "bun" && selectedBun) {
         const constructorIngredientsClone = constructorIngredients.slice();
         constructorIngredientsClone.splice(selectedBunIndex, 1, targetIngredient);
         dispatch(draggingAnElement(constructorIngredientsClone));
      } else {
         dispatch(draggingAnElement([...constructorIngredients, targetIngredient]));
      }
   }

   return (
      <div className={`${style.item} mt-6 ml-4 mr-3 mb-10`} onContextMenu={handleChoseIngredient} data-id={_id} ref={dragRef} onClick={() => onClick(ingredient)}>
         {counter > 0 && <Counter className={style.count} count={counter} size="default" />}
         <img className={`${style.bun} ml-4 mr-4 mb-1`} src={image} alt="" />
         <div className={`${style.price} mb-1`}>
            <span className="text text_type_digits-default mr-2">{price}</span>
            <CurrencyIcon type="primary" />
         </div>
         <h3 className={`${style.name} text text_type_main-default`}>{name}</h3>
      </div>
   )
}

Ingredient.propTypes = {
   ingredient: ingredientsPropTypes.isRequired
}

export default Ingredient;