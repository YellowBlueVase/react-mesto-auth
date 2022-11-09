import "../index.css";
import api from "../utils/api.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import React from "react";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser?._id);

    if (isLiked) 
      {
        api.deleteLike(card._id)
        .then((data) => {
          setCards(data.likes)})
        .catch((err) => {console.log(err)})
      }
      else {
        api.addLike(card._id)
        .then((data) => {
          setCards(data.likes)})
        .catch((err) => {console.log(err)})}
      } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(current => current.filter(item => {return item._id !== card._id}))
    })
    .catch((err) => {console.log(err)})
  }

  function handleAddPlaceSubmit(props) {
    const newCard = {
      name: props.name,
      link: props.link,
      likes: [],
      owner: currentUser,
      _id: Math.random()
    }
    api.addNewCard(newCard)
    .then(() => {
      setCards([newCard, ...cards]);
    })
    .catch((err) => {console.log(err)})
  }
  
  function handleUpdateUser(props) {
    api.updateProfile(props)
    .then(() => {
      setCurrentUser({...currentUser, name: props.name, about: props.about})
      closeAllPopups()
    })
    .catch((err) => {console.log(err)})
  }

  function handleUpdateAvatar(props) {
    api.updateAvatar(props.avatar)
    .then(() => {
      setCurrentUser({...currentUser, avatar: props.avatar})
      closeAllPopups()
    })
    .catch((err) => {console.log(err)})
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
    
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  React.useEffect(() => {
    api
      .getProfileInfo()
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} /> 
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} /> 
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit} /> 
        <PopupWithForm
          title="Вы уверены?"
          name="delete"
          onClose={closeAllPopups}
          buttonText="Все равно удалить"
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
