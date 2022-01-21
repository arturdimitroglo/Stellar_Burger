import React from 'react';
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

   const bun = React.useMemo(() => ingredients.filter(elem => elem.type === 'bun'), [ingredients]);
   const main = React.useMemo(() => ingredients.filter(elem => elem.type === 'main'), [ingredients]);
   const sauce = React.useMemo(() => ingredients.filter(elem => elem.type === 'sauce'), [ingredients]);

   const openIngredientDetails = () => {
      setModalIngredientDetailsActive(true)
   }

   const closeIngredientDetails = () => {
      setModalIngredientDetailsActive(false)
   }


   return (
      <>
         <div className='mt-5 mr-10'>
            <nav className={style.tab}>
               <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                  Булки
               </Tab>
               <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                  Соусы
               </Tab>
               <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                  Начинки
               </Tab>
            </nav>

            <div className={style.ingredients}>
               <ListIngredients ingredients={bun} title='Булки' clickIngredient={setIngredientData} onClick={openIngredientDetails} />
               <ListIngredients ingredients={main} title='Начинки' clickIngredient={setIngredientData} onClick={openIngredientDetails} />
               <ListIngredients ingredients={sauce} title='Соусы' clickIngredient={setIngredientData} onClick={openIngredientDetails} />
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