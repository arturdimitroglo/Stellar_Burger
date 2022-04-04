import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import { useDrag } from "react-dnd";
import { IIngredient, IIngredientProps } from '../../utils/types';
import { openIngredientDetails } from '../../services/reducers/modal';
import { draggingAnElement } from '../../services/reducers/ingredient';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import { Link, useLocation } from 'react-router-dom';


const Ingredient: FC<IIngredientProps> = ({ ingredient }) => {
   const { image, price, name, _id } = ingredient;
   const { constructorIngredients, ingredients } = useAppSelector(state => state.ingredientSlice)

   const dispatch = useAppDispatch()
   const location = useLocation();
   const onClick = (elem: IIngredient | null) => {
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

   constructorIngredients.forEach((ingredient: IIngredient) => ingredient.name === name && (ingredient.type === 'bun' ? counter += 2 : counter += 1))
   
   const handleChoseIngredient: React.MouseEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      const targetIngredient = ingredients.find(
         (ingredient: IIngredient) => ingredient._id === e.currentTarget.dataset.id
      );
      const selectedBun = constructorIngredients.find(
         (ingredient: IIngredient) => ingredient.type === "bun"
      );

      const selectedBunIndex = selectedBun && constructorIngredients.indexOf(selectedBun);

      if (targetIngredient) {
         if (targetIngredient.type === "bun" && selectedBun) {
            const constructorIngredientsClone = constructorIngredients.slice();
            selectedBunIndex && constructorIngredientsClone.splice(selectedBunIndex, 1, targetIngredient);
            dispatch(draggingAnElement(constructorIngredientsClone));
         } else {
            dispatch(draggingAnElement([...constructorIngredients, targetIngredient]));
         }
      }
   }

   return (
      <div className={`${style.item} mt-6 ml-4 mr-3 mb-10`} onContextMenu={handleChoseIngredient} data-id={_id} ref={dragRef} onClick={() => onClick(ingredient)}>
         <Link className={style.link} to={{pathname: `/ingredients/${_id}`}} state={{ background: location }}>
            {counter > 0 && <Counter count={counter} size="default" />}
            <img className={`${style.bun} ml-4 mr-4 mb-1`} src={image} alt="" />
            <div className={`${style.price} mb-1`}>
               <span className="text text_type_digits-default mr-2">{price}</span>
               <CurrencyIcon type="primary" />
            </div>
            <h3 className={`${style.name} text text_type_main-default`}>{name}</h3>
         </Link>
      </div>
   )
}

export default Ingredient;