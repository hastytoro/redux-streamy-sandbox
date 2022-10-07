import React from "react";
import { createPortal } from "react-dom";

const container = document.getElementById("modal");

const Modal = ({ onDismiss, title, content, components }) => {
  return createPortal(
    <div onClick={onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{title}</div>
        <div className="content">{content}</div>
        <div className="actions">{components}</div>
      </div>
    </div>,
    container
  );
};

export default Modal;
