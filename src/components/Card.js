import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser?._id;

  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  ); 

  let isLiked = props.card.likes.some(i => i._id === currentUser?._id);

  const cardLikeButtonClassName = (
    `card__like ${isLiked && 'card__like_active'}`
  ); 
  
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
    isLiked = !isLiked
  }
  
  function handleDeleteClick() {
    props.onCardDelete(props.card);
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
      <button 
        type="button" 
        name="like-button" 
        className={cardLikeButtonClassName}
        onClick={handleLikeClick}
      ></button>
      <div name="like-counter" className="card__like-counter">
        {props.card.likes.length}
      </div>
      <button
        type="button"
        name="delete-button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </div>
  );
}

export default Card;
