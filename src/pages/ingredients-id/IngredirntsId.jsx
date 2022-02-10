import React from "react";
import style from './IngredirntsId.module.css'
import AppHeader from '../../components/app-header/AppHeader';
import IngredientDetails from '../../components/ingredient-details/IngredientDetails'

const IngredientsId = () => {
   return (
      <>
         <AppHeader />
         <div className={`${style.content} mt-30`}>
            <p className="text text_type_main-large m-2">
               Детали ингредиента
            </p>
            <IngredientDetails />
         </div>

      </>
   )
}

export default IngredientsId;