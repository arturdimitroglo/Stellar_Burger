import React from 'react';
import style from './Main.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { draggingAnElement } from '../../services/reducers/ingredient';


const Main = () => {
   const dispatch = useDispatch()
   const { ingredients, constructorIngredients } = useSelector(state => state.ingredientSlice);
   
   const handleDrop = (item) => {
      const targetIngredient = ingredients.find(ingredient => ingredient._id === item._id)
      const selectedBun = constructorIngredients.find(ingredient => ingredient.type === 'bun')
      const selectedBunIndex = constructorIngredients.indexOf(selectedBun)

      if (targetIngredient.type === 'bun' && selectedBun) {
         const constructorIngredientsClone = constructorIngredients.slice();
         constructorIngredientsClone.splice(selectedBunIndex, 1, targetIngredient);
         dispatch(draggingAnElement(constructorIngredientsClone));
      } else {
         dispatch(draggingAnElement([...constructorIngredients, targetIngredient]));
      }
   }

   return (
      <main>
         <DndProvider backend={HTML5Backend}>
            <div className={style.border}>
               <div className='mt-10'>
                  <p className='text text_type_main-large'>Соберите бургер</p>

                  <BurgerIngredients />
               </div>
               <>
                  <BurgerConstructor onDropHandler={handleDrop} />
               </>
            </div>
         </DndProvider>
      </main>
   )
}

export default Main;