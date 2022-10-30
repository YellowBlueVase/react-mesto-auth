import React from "react";
import api from "../utils/api.js";
import Card from "./Card.js";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getProfileInfo()
      .then((currentUser) => {
        setUserName(currentUser.name);
        setUserDescription(currentUser.about);
        setUserAvatar(currentUser.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={userAvatar}
            className="profile__avatar-image"
            alt={`Фотография ${userName}`}
          />
          <button
            type="button"
            onClick={props.onEditAvatar}
            name="edit-avatar"
            className="profile__avatar-hover"
          >
            <img
              src="../images/avatar-hover.svg"
              className="profile__avatar-icon"
              alt={`Иконка наведения на аватар ${userName}`}
            />
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            type="button"
            onClick={props.onEditProfile}
            name="edit-button"
            className="profile__edit-button"
          ></button>
          <h2 className="profile__job">{userDescription}</h2>
        </div>
        <button
          type="button"
          onClick={props.onAddPlace}
          name="add-button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
