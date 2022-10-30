import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="card">
      <img
        src={props.card.link}
        className="card__image"
        alt={`Картинка карточки ${props.card.name} в миниатюре`}
        onClick={handleClick}
      />
      <h2 className="card__title">{props.card.name}</h2>
      <button type="button" name="like-button" className="card__like"></button>
      <div name="like-counter" className="card__like-counter">
        {props.card.likes.length}
      </div>
      <button
        type="button"
        name="delete-button"
        className="card__delete-button"
      ></button>
    </div>
  );
}

export default Card;
