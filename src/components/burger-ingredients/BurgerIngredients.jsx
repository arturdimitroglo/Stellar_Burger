import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerIngredients.module.css';
import ListIngredients from '../list-ingredients/ListIngredients';
import Modal from '../modal/Modal.jsx';
import IngredientDetails from '../ingredient-details/IngredientDetails.jsx';


const BurgerIngredients = ({ ingredients }) => {
   const [current, setCurrent] = React.useState('bun');
   const [modalIngredientDetailsActive, setModalIngredientDetailsActive] = React.useState(false);
   const [ingredientData, setIngredientData] = React.useState(null);

   const bunRef = useRef(null);
   const mainRef = useRef(null);
   const sauceRef = useRef(null);
   const navRef = useRef(null);

   const bun = React.useMemo(() => ingredients.filter(elem => elem.type === 'bun'), [ingredients]);
   const main = React.useMemo(() => ingredients.filter(elem => elem.type === 'main'), [ingredients]);
   const sauce = React.useMemo(() => ingredients.filter(elem => elem.type === 'sauce'), [ingredients]);

   const openIngredientDetails = () => {
      setModalIngredientDetailsActive(true)
   }
   const closeIngredientDetails = () => {
      setModalIngredientDetailsActive(false)
   }
   
   const clickTabBun = (elem) => {
      setCurrent(elem)
      bunRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
   }
   const clickTabSauce = (elem) => {
      setCurrent(elem)
      sauceRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
   }
   const clickTabMain = (elem) => {
      setCurrent(elem)
      mainRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
   }


   return (
      <>
         <div className='mt-5 mr-10'>
            <nav className={style.tab} ref={navRef}>
               <Tab value="bun" active={current === 'bun'} onClick={clickTabBun} >
                  Булки
               </Tab>
               <Tab value="main" active={current === 'main'} onClick={clickTabMain} >
                  Начинки
               </Tab>
               <Tab value="sauce" active={current === 'sauce'} onClick={clickTabSauce} >
                  Соусы
               </Tab>
            </nav>

            <div className={style.ingredients}>
               <ListIngredients ref={bunRef} ingredients={bun} title='Булки' clickIngredient={setIngredientData} onClick={openIngredientDetails} />
               <ListIngredients ref={mainRef} ingredients={main} title='Начинки' clickIngredient={setIngredientData} onClick={openIngredientDetails} />
               <ListIngredients ref={sauceRef} ingredients={sauce} title='Соусы' clickIngredient={setIngredientData} onClick={openIngredientDetails} />
            </div>
         </div>
         {modalIngredientDetailsActive &&
            <Modal title='Детали ингредиента' onClick={closeIngredientDetails}>
               <IngredientDetails ingredientInfo={ingredientData} />
            </Modal >
         }
      </>
   )
}

BurgerIngredients.propTypes = {
   ingredient: PropTypes.arrayOf(PropTypes.object.isRequired)
}

export default BurgerIngredients;