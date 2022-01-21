import React from 'react';
import style from './App.module.css';
import AppHeader from '../app-header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';




function App() {

  const URL = "https://norma.nomoreparties.space/api/ingredients";
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(
    () => {
      fetch(`${URL}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        return res.json()
      }).then(res => {
        setIngredients(res.data)
      }).catch(err =>
        console.log(err)
      )
    }, [])

  return (
    <div className='App'>
      <AppHeader />
      <div className={style.border}>
        <div className='mt-10'>
          <p className='text text_type_main-large'>Соберите бургер</p>

          <BurgerIngredients ingredients={ingredients} />
        </div>
        <>
          <BurgerConstructor data={ingredients} />
        </>
      </div>
    </div>
  )
}

export default App;