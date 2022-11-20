import React from 'react';
import { BASE_URL } from '../utils/constants';
import { withRouter, useHistory } from 'react-router-dom';

const Login = ({handleLoggedInChange, handleRegister}) => {
    const [inputData, setInputData] = React.useState({
        email: '',
        password: ''
    });
    const history = useHistory();

    function handleChange(e) {
        const {name, value} = e.target;
        setInputData((inputData) => ({...inputData, [name]: value}));
    }

    function handleSubmit(e){
        e.preventDefault();
        if (!inputData.email || !inputData.password){
          return;
        };
        authorize(inputData.password, inputData.email)
        .then((data) => {
                if (data.token === localStorage.getItem('jwt')) {
                    history.push('/'); 
                    handleLoggedInChange()
                  }})
        .catch(err => console.log(err)); 
    } 

    const authorize = (password, email) => {
        return fetch(`${BASE_URL}/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({password, email})
        })
        .then((res) => {
            try {
                if (res.status === 200 || 201){
                    localStorage.setItem('userEmail', inputData.email)
                    return res.json();
                }} 
            catch(e){
                handleRegister('error');
                return (e)
                }}
            )
        .then((data) => {
            localStorage.setItem('jwt', data.token);
            return data;
        })
        .catch(err => console.log(err))
      };

    return (
        <form
          className={`form-container form-container_dark`}
          onSubmit={handleSubmit}
        >
            <h2 className="form-container__title form-container__title_dark">Вход</h2>
            <input
                id="form-container__input_email"
                type="text"
                name="email"
                placeholder="Email"
                required
                minLength="2"
                maxLength="200"
                className="form-container__input form-container__input_email"
                value={inputData.email || ''}
                onChange={handleChange}
            />
            <input
                id="form-container__input_password"
                type="password"
                name="password"
                placeholder="Пароль"
                required
                minLength="2"
                maxLength="200"
                className="form-container__input form-container__input_password"
                value={inputData.password || ''}
                onChange={handleChange}
                />
            <button
                type="submit"
                name="submit"
                className="form-container__submit form-container__submit_dark">
                Войти
            </button>
        </form>
    )
}

export default withRouter(Login);