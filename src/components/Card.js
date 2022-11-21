import {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
 
  const isOwn = card.owner._id === currentUser?._id;

  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  ); 

  let isLiked = card.likes.some(i => i._id === currentUser?._id);

  const cardLikeButtonClassName = (
    `card__like ${isLiked && 'card__like_active'}`
  ); 

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
    isLiked = !isLiked
  }
  
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <img
        src={card.link}
        className="card__image"
        alt={`Картинка карточки ${card.name} в миниатюре`}
        onClick={handleClick}
      />
      <h2 className="card__title">{card.name}</h2>
      <button 
        type="button" 
        name="like-button" 
        className={cardLikeButtonClassName}
        onClick={handleLikeClick}
      ></button>
      <div name="like-counter" className="card__like-counter">
        {card.likes.length}
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
