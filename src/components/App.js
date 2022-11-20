import "../index.css";
import React from "react";
import api from "../utils/api.js";
import { BASE_URL } from "../utils/constants";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login";
import Register from "./Register";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import {InfoToolTip} from "./InfoToolTip.js";
import { ProtectedRoute } from "./ProtectedRoute";
import { Route, Switch, useHistory } from 'react-router-dom';
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [registerStatus, setRegisterStatus] = React.useState({isOpen: false, status: '', title: ''});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const history = useHistory();

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

  function handleLoggedInChange() {
    setLoggedIn(!loggedIn)
  }

  function handleRegisterStatus(status) {
    status === 'success' && setRegisterStatus({
        isOpen: true,
        title: "Вы успешно зарегистрировались!",
        status: 'status_success'
      })
    status === 'error' && setRegisterStatus({
        isOpen: true,
        title: "Что-то пошло не так! Попробуйте еще раз.",
        status: 'status_error'
      });
    status === '' && setRegisterStatus({})
  }

  const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
  } 

  function handleTokenCheck(){
    if (localStorage.getItem('jwt')){
    const jwt = localStorage.getItem('jwt');
    checkToken(jwt).then((res) => {
      if (res){
        setLoggedIn({
          loggedIn: true,
        }, () => {
          history.push("/");
        });
      }
    }); 
  }}

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setRegisterStatus({
      isOpen: false,
      title: '',
      status: ''
    })
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    registerStatus.isOpen;

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

  React.useEffect(() => {
    handleTokenCheck()
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          userProfile={loggedIn && localStorage.getItem('userEmail')}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn} />
        <Switch>
          <Route exact path="/signin">
            <Login 
              handleLoggedInChange={handleLoggedInChange}
              handleRegister={handleRegisterStatus} />
          </Route>
          <Route exact path="/signup">
            <Register 
              handleRegister={handleRegisterStatus}
              onClose={closeAllPopups} />
          </Route>
          <ProtectedRoute 
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            />
        </Switch>
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
            buttonText="Все равно удалить"/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoToolTip 
            status={registerStatus}
            onClose={closeAllPopups}/>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
