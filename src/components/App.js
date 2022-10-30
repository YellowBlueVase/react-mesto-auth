import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';

function App() {
  const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false)
  const [isEditProfilePopupOpen, setProfilePopup] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState()

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditAvatarClick() {
    setAvatarPopup(true)
  } 

  function handleEditProfileClick() {
    setProfilePopup(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopup(true)
  }
  
  function closeAllPopups() {
    setAvatarPopup(false)
    setProfilePopup(false)
    setAddPlacePopup(false)
    setSelectedCard()
  }

  return (
    <div className="page">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        />
      <PopupWithForm 
        title="Редактировать профиль"
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        >
          <input id="form-container__input_name" type="text" name="name" placeholder="Имя" required minLength="2" maxLength="40" className="form-container__input form-container__input_name"/>
                <span id="form-container__input_name-error"></span>
                <input id="form-container__input_job" type="text" name="about" placeholder="О себе" required  minLength="2" maxLength="200" className="form-container__input form-container__input_job"/>
                <span id="form-container__input_job-error"></span>
      </PopupWithForm>
      <PopupWithForm 
        title="Обновить аватар"
        name="edit-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        >
          <input id="form-container__input_avatar" type="text" name="avatar" placeholder="Ссылка на аватар" required minLength="2" maxLength="400" className="form-container__input form-container__input_name"/>
                <span id="form-container__input_avatar-error"></span>
      </PopupWithForm>
      <PopupWithForm 
        title="Новое место"
        name="new-place"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        >
          <input id="form-container__input_place" type="text" name="name" placeholder="Название" required minLength="2" maxLength="30" className="form-container__input form-container__input_place"/>
                <span id="form-container__input_place-error"></span>
                <input id="form-container__input_image" type="url" name="link" placeholder="Ссылка на картинку" required className="form-container__input form-container__input_image"/>
                <span id="form-container__input_image-error"></span>
      </PopupWithForm>
      <PopupWithForm 
        title="Вы уверены?"
        name="delete"
        onClose={closeAllPopups}/>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}/>
      <Footer />
    </div>
  );
}

export default App;
