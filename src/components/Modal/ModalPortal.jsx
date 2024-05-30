import { createPortal } from "react-dom";

const ModalPortal = ({children}) => {
  const target = document.querySelector(".calendar-start");
  return createPortal(children, target);
}

export default ModalPortal;