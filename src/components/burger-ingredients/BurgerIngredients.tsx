import React, { FC, useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerIngredients.module.css';
import ListIngredients from '../list-ingredients/ListIngredients';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { closeIngredientDetails } from '../../services/reducers/modal';
import { compareCoords } from '../../utils/compare-coords';
import { useAppSelector } from '../../hook/hook';
import { LocationState } from '../../utils/types';


const BurgerIngredients: FC = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { ingredients } = useAppSelector(state => state.ingredientSlice);
   const { modalIngredientDetailsActive } = useAppSelector(state => state.modalSlice);
   const [current, setCurrent] = useState('bun');

   const bun = useMemo(() => ingredients.filter(elem => elem.type === 'bun'), [ingredients]);
   const main = useMemo(() => ingredients.filter(elem => elem.type === 'main'), [ingredients]);
   const sauce = useMemo(() => ingredients.filter(elem => elem.type === 'sauce'), [ingredients]);

   const scrollHandler: React.UIEventHandler<HTMLDivElement> = (evt) => {
      evt.target.addEventListener('scroll', function () {
         setCurrent(compareCoords(style.tab))
      });
   }

   const clickTab = (type: string) => {
      setCurrent(type)
      document.querySelector(`#${type}`)?.scrollIntoView({ block: "start", behavior: "smooth" })
   }

   const location = useLocation();
   const background = location.state && (location.state as LocationState)?.background;

   const closeDetails = () => {
      dispatch(closeIngredientDetails())
      background && navigate(-1);
   }

   return (
      <>
         <div className='mt-5 mr-10' >
            <nav className={style.tab}  >
               <Tab value="bun" active={current === 'bun'} onClick={clickTab} >
                  Булки
               </Tab>
               <Tab value="main" active={current === 'main'} onClick={clickTab} >
                  Начинки
               </Tab>
               <Tab value="sauce" active={current === 'sauce'} onClick={clickTab} >
                  Соусы
               </Tab>
            </nav>

            <div onScroll={scrollHandler} className={style.ingredients} >
               <ListIngredients id="bun" ingredients={bun} title='Булки' />
               <ListIngredients id="main" ingredients={main} title='Начинки' />
               <ListIngredients id="sauce" ingredients={sauce} title='Соусы' />
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