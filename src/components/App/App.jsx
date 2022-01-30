import React from 'react';
import style from './App.module.css';
import AppHeader from '../app-header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { useDispatch, useSelector } from 'react-redux';
import { GetFeed } from '../../services/actions/GetFeed'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { draggingAnElement, deleteBun } from '../../services/index';



function App() {
  const dispatch = useDispatch()
  const { feedFailed, feedRequest, ingredients, constructorIngredients } = useSelector(state => state.counterSlice);
  
  React.useEffect(
    () => {
      dispatch(GetFeed())
    }, [dispatch])

  const handleDrop = (item) => {
    const targetIngredient = ingredients.find(ingredient => ingredient._id === item._id)
    const selectedBun = constructorIngredients.find(ingredient => ingredient.type === 'bun')

    if (targetIngredient.type === 'bun' && selectedBun) {
      dispatch(deleteBun())
      dispatch(draggingAnElement(targetIngredient));
    } else {
      dispatch(draggingAnElement(targetIngredient));
    }
  }

  return (
    <div className='App'>
      <AppHeader />
      {feedFailed && !feedRequest &&
        <p className={style.differentResult}>
          Произошла ошибка при получении данных, попробуйте перезагрузить страницу
        </p>}

      {feedRequest && !feedFailed && <p className={style.differentResult}>Загрузка...</p>}

      {ingredients && !feedFailed && (
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
      )}
    </div>
  )
}

export default App;
