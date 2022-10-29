import React from 'react';

function PopupWithForm(props) {

    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        if (props.isOpen===true) {
            setIsOpen(true)
            document.addEventListener('keydown', (e) => {if (e.key === "Escape") {props.onClose()}}); 
            document.addEventListener('click', (e) => {
                const target = e.target;
                if (target.classList.contains('popup') || e.target.classList.contains('popup__close-button'))
                {props.onClose()}
            });
        }

        return () => {
            setIsOpen(false)
            document.removeEventListener('keydown', (e) => {if (e.key === "Escape") {props.onClose()}}); 

        }}, [props.isOpen, props.onClose])
    
    return (
            <div className={`popup popup_type_${props.name} ${isOpen && ('popup_opened')}`} tabIndex="-1">
                <div className="popup__container">
                    <button type="button" name="close-button" className="popup__close-button" onClick={props.onClose}></button>
                    <form name={`form-${props.name}`} className={`form-container form-container_${props.name}`} noValidate>
                    <h2 className="form-container__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" name="submit" className="form-container__submit" onSubmit={props.onClose}>Сохранить</button>
                    </form>
                </div>
            </div>
    )
}

export default PopupWithForm;