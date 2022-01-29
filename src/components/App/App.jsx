import React from 'react';
import style from './App.module.css';
import AppHeader from '../app-header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { useDispatch, useSelector } from 'react-redux';
import { GetFeed } from '../../services/actions/GetFeed'


function App() {
  const dispatch = useDispatch()
  const { feedFailed, feedRequest, ingredients } = useSelector(state => state.counterSlice);

  React.useEffect(
    () => {
      dispatch(GetFeed())
    }, [dispatch])

  return (
    <div className='App'>
      <AppHeader />
      {feedFailed && !feedRequest && 
        <p className={style.differentResult}>
          Произошла ошибка при получении данных, попробуйте перезагрузить страницу
        </p>} 

      {feedRequest && !feedFailed && <p className={style.differentResult}>Загрузка...</p>}
      
      {ingredients && !feedFailed && (<div className={style.border}>
        <div className='mt-10'>
          <p className='text text_type_main-large'>Соберите бургер</p>

          <BurgerIngredients />
        </div>
        <>
          <BurgerConstructor />
        </>
      </div>)}
    </div>
  )
}

export default App;
