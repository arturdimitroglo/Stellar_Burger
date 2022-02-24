import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';

const modalRoot = document.getElementById("modals");

function Modal({ title, children, onClick }) {

   React.useEffect(
      () => {
         const pressEcs = (e) => {
            e.key === 'Escape' && onClick()
         };

         document.addEventListener('keydown', pressEcs);
         return () => {
            document.removeEventListener('keydown', pressEcs)
         }
      }, [onClick]
   )

   return ReactDOM.createPortal(
      <>
         <div className={`${style.modal} p-10`}>
            <div className={style.heder} >
               <p className="text text_type_main-large">
                  {title}
               </p>
               <button className={style.button} onClick={onClick}>
                  <CloseIcon type="primary" />
               </button>
            </div>
            <div className={style.content}>
               {children}
            </div>
         </div>

         <ModalOverlay onClick={onClick} />
      </>,
      modalRoot
   );
}

Modal.propTypes = {
   title: PropTypes.string,
   onClick: PropTypes.func.isRequired,
   children: PropTypes.node.isRequired
}

export default Modal;
