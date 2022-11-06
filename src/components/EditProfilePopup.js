import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
    const isOpen = props.isOpen;
    const onClose = props.onClose;

    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();

    const currentUser = React.useContext(CurrentUserContext)

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.onUpdateUser({
            name:name,
            about:description,
        })
    }

    React.useEffect(() => {
        setName(currentUser?.name);
        setDescription(currentUser?.about);
    }, [currentUser])


    return (
        <PopupWithForm
          title="Редактировать профиль"
          name="edit-profile"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          buttonText="Сохранить"
        >
          <input
            id="form-container__input_name"
            type="text"
            name="name"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            className="form-container__input form-container__input_name"
            value={name}
            onChange={handleNameChange}
          />
          <span id="form-container__input_name-error"></span>
          <input
            id="form-container__input_job"
            type="text"
            name="about"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
            className="form-container__input form-container__input_job"
            value={description}
            onChange={handleDescriptionChange}
          />
          <span id="form-container__input_job-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;