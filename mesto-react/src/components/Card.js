import React, { useEffect } from 'react';

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card)
    }

    return(
        <div id="card-template">
            <div className="card" id={props.key} onClick={handleClick}>
                <img src={props.card.link} className="card__image" alt="Картинка карточки в миниатюре"/>
                <h2 className="card__title">{props.card.name}</h2>
                <button type="button" name="like-button" className="card__like"></button>
                <div name="like-counter" className="card__like-counter">{props.card.likes.length}</div>
                <button type="button" name="delete-button" className="card__delete-button"></button>
            </div>
        </div>
        )
    }

export default Card;