import React from "react";

function PopupWithForm(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (props.isOpen === true) {
      setIsOpen(true);
    
      return () => {
        setIsOpen(false);}
      }}, [props.isOpen]);

  return (
    <div
      className={`popup popup_type_${props.name} ${isOpen && "popup_opened"}`}
      tabIndex="-1"
    >
      <div className="popup__container">
        <button
          type="button"
          name="close-button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <form
          name={`form-${props.name}`}
          className={`form-container form-container_${props.name}`}
        >
          <h2 className="form-container__title">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            name="submit"
            className="form-container__submit"
          >{props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
