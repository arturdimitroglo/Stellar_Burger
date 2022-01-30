import React, { useEffect, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerIngredients.module.css';
import ListIngredients from '../list-ingredients/ListIngredients';
import Modal from '../modal/Modal.jsx';
import IngredientDetails from '../ingredient-details/IngredientDetails.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { currentActive } from '../../services/index';
import useScroll from '../use-scroll/UseScroll';

const BurgerIngredients = () => {

   const dispatch = useDispatch()

   const { current, ingredients, modalIngredientDetailsActive } = useSelector(state => state.counterSlice)

   const bunRef = useRef(null);
   const mainRef = useRef(null);
   const sauceRef = useRef(null);
   const parentRef = useRef();

   const bun = React.useMemo(() => ingredients.filter(elem => elem.type === 'bun'), [ingredients]);
   const main = React.useMemo(() => ingredients.filter(elem => elem.type === 'main'), [ingredients]);
   const sauce = React.useMemo(() => ingredients.filter(elem => elem.type === 'sauce'), [ingredients]);

   const clickTabBun = (elem) => {
      dispatch(currentActive(elem))
      bunRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
   }
   const clickTabSauce = (elem) => {
      dispatch(currentActive(elem))
      sauceRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
   }
   const clickTabMain = (elem) => {
      dispatch(currentActive(elem))
      mainRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
   }

   const activeObserveBun = useScroll(parentRef, bunRef, () => activeTab('bun'))
   const activeObserveMain = useScroll(parentRef, mainRef, () => activeTab('main'))
   const activeObserveSauce = useScroll(parentRef, sauceRef, () => activeTab('sauce'))

   function activeTab(elem) {
      dispatch(currentActive(elem))
   }


   return (
      <>
         <div className='mt-5 mr-10' >
            <nav className={style.tab}  >
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

            <div className={style.ingredients} ref={parentRef}>
               <ListIngredients ref={bunRef} ingredients={bun} title='Булки' />
               <ListIngredients ref={mainRef} ingredients={main} title='Начинки' />
               <ListIngredients ref={sauceRef} ingredients={sauce} title='Соусы' />
            </div>
         </div>
         {modalIngredientDetailsActive &&
            <Modal title='Детали ингредиента' >
               <IngredientDetails />
            </Modal >
         }
      </>
   )
}

export default BurgerIngredients;