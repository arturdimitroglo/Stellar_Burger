import React from "react";
import style from './PressureArea.module.css';

function PressureArea() {
   return(
      <>
         <div className={`${style.bunTop} ml-20 mt-4 mb-4`}>
            <p className="text text_type_main-large">
               Добавте булку
            </p>
         </div>

         <div className={`${style.pressureArea} ml-20 mt-4 mb-4`}>
            <p className="text text_type_main-large">
               Добавте игреденты
            </p>
         </div>

         <div className={`${style.bunBot} ml-20 mt-4 mb-4`}>
            <p className="text text_type_main-large">
               Добавте булку
            </p>
         </div>
      </>

   )
}

export default PressureArea;