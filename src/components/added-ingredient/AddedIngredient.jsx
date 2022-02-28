import { useSelector, useDispatch } from 'react-redux';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from "react-dnd";
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { deleteIngredient } from '../../services/reducers/ingredient';
import ingredientsPropTypes from '../../utils/types';


function AddedIngredient({ ingredient, id, index, moveCard }) {
   const { name, price, image, } = ingredient;
   const { constructorIngredients } = useSelector(state => state.ingredientSlice);
   const dispatch = useDispatch();
   const ref = useRef(null);

   const onClose = (elem) => {
      const del = constructorIngredients.indexOf(elem);
      dispatch(deleteIngredient(del))
   }

   const [, drop] = useDrop({
      accept: 'card',
      hover: (item, monitor) => {
         if (!ref.current) {
            return;
         }

         const dragIndex = item.index;
         const hoverIndex = index;

         if (dragIndex === hoverIndex) {
            return;
         }

         const hoverBoundingRect = ref.current?.getBoundingClientRect();
         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
         const clientOffset = monitor.getClientOffset();
         const hoverClientY = clientOffset.y - hoverBoundingRect.top;

         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
         }

         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
         }

         moveCard(dragIndex, hoverIndex)
         item.index = hoverIndex;
      }
   })

   const [{ isDrag }, drag] = useDrag({
      type: 'card',
      item: () => {
         return { id, index }
      },
      collect: monitor => ({
         isDrag: monitor.isDragging()
      })
   })
   drag(drop(ref));

   const opacity = isDrag ? 0 : 1;

   return (
      <li ref={ref} style={{ opacity }} className='m-4'>
         <DragIcon />
         <ConstructorElement
            text={name}
            price={price}
            thumbnail={image}
            handleClose={(e) => onClose(ingredient)}
         />
      </li>
   )
}

AddedIngredient.propTypes = {
   ingredient: ingredientsPropTypes.isRequired,
   id: PropTypes.string.isRequired,
   moveCard: PropTypes.func.isRequired,
   index: PropTypes.number.isRequired,
};

export default AddedIngredient;
