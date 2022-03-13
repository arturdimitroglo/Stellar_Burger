import React, { FC } from "react";
import PropTypes from "prop-types";
import style from './ModalOverlay.module.css';
import { IModalOverlayProps } from "../../utils/types";

const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }) => {
   return (
      <div className={style.overlay} onClick={onClick}></div>
   )
}

// ModalOverlay.propTypes = {
//    onClick: PropTypes.func.isRequired
// }

export default ModalOverlay;