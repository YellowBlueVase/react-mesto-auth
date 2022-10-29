import React from 'react';

function ImagePopup(props) {

    React.useEffect(() => {
        document.addEventListener('keydown', (e) => {if (e.key === "Escape") {props.onClose()}}); 

        return () => {
            document.removeEventListener('keydown', (e) => {if (e.key === "Escape") {props.onClose()}}); 
        }})

    return(
        <div className={`popup popup_type_large-image ${props.card && 'popup_opened'}`} tabIndex="-1">
            <div className="popup__container">
                <button type="button" name="close-button" className="popup__close-button" onClick={props.onClose}></button>
                <div className="image-container">
                <img src={props.card && props.card.link} className="image-container__image" alt="Картинка карточки в большом размере"/>
                <h3 className="image-container__title">{props.card && props.card.name}</h3>
                </div>
            </div>
        </div>
    )
}

export default ImagePopup;