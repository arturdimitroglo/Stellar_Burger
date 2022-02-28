import React, { useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerIngredients.module.css';
import ListIngredients from '../list-ingredients/ListIngredients';
import Modal from '../modal/Modal.jsx';
import IngredientDetails from '../ingredient-details/IngredientDetails.jsx';
import { useDispatch, useSelector } from 'react-redux';
import useScroll from '../use-scroll/UseScroll';
import { Navigate, useLocation } from 'react-router-dom';
import { currentActive } from '../../services/reducers/ingredient';
import { closeIngredientDetails } from '../../services/reducers/modal';


const BurgerIngredients = () => {

   const dispatch = useDispatch();
   const { current, ingredients } = useSelector(state => state.ingredientSlice);
   const { modalIngredientDetailsActive } = useSelector(state => state.modalSlice)

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

   const location = useLocation();
   const background = location.state && location.state.background;

   function activeTab(elem) {
      dispatch(currentActive(elem))
   }

   const closeDetails = () => {
      dispatch(closeIngredientDetails())
      background && Navigate(-1);
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
            <Modal title='Детали ингредиента' onClick={closeDetails} >
               <IngredientDetails />
            </Modal >
         }
      </>
   )
}

export default BurgerIngredients;