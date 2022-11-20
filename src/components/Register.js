import React from 'react';
import { BASE_URL } from '../utils/constants';
import { Link, withRouter, useHistory } from 'react-router-dom';

const Register = ({handleRegister, onClose}) => {
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
        e.preventDefault()
        register(inputData.password, inputData.email).then((res) => {
            if(res) {
                history.push('/signin');
                onClose()
            } 
        })
    }

    function register(password, email) {
     return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
    .then((response) => {
        try {
        if (response.status === 200 || 201){
            handleRegister('success');
            return response.json();
        }} catch(e){
            handleRegister('error');
            return (e)
        }
    })
    .then((res) => {
        return res;
    })
    .catch((err) => console.log(err));
    }; 

    return (
        <form
          className={`form-container form-container_dark`}
          onSubmit={handleSubmit}
        >
            <h2 className="form-container__title form-container__title_dark">Регистрация</h2>
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
                Зарегистрироваться
            </button>
            <div className='register__signin'>
                <Link to="/signin" className='register__signin__login-link'>
                Уже зарегистрированы? Войти
                </Link>
            </div>
        </form>
    )
}

export default withRouter(Register);