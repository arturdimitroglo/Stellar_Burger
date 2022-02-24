import React from "react";
import style from './IngredientDetails.module.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const IngredientDetails = () => {
   const { actualIngredient } = useSelector(state => state.counterSlice)
   const { name, proteins, fat, carbohydrates, calories, image } = actualIngredient;

   return (
      <div className={style.modal}>
         <img src={image} alt="" className={`${style.img} mb-4`} />

         <p className={`${style.name} text text_type_main-default mb-8`}>
            {name}
         </p>

         <ul className={`${style.nutrition_values} mb-15`}>
            <li className={`${style.value} mr-5`}>
               <p className="text text_type_main-default text_color_inactive">Каллорииб,ккал</p>
               <p className="text text_type_main-default text_color_inactive">{calories}</p>
            </li>
            <li className={`${style.value} mr-5`}>
               <p className="text text_type_main-default text_color_inactive">Белки,г</p>
               <p className="text text_type_main-default text_color_inactive">{proteins}</p>
            </li>
            <li className={`${style.value} mr-5`}>
               <p className="text text_type_main-default text_color_inactive">Жиры,г</p>
               <p className="text text_type_main-default text_color_inactive">{fat}</p>
            </li>
            <li className={`${style.value} mr-5`}>
               <p className="text text_type_main-default text_color_inactive">Углеводы,г</p>
               <p className="text text_type_main-default text_color_inactive">{carbohydrates}</p>
            </li>
         </ul>

      </div>
   )
}

export default IngredientDetails;