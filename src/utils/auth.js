const BASE_URL = 'https://auth.nomoreparties.co';

function getResponseData(res) {
    if (res.ok) {
      return res.json()}
    return Promise.reject(`Cтатус ошибки ${res.status}`)
  }

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
       method: 'POST',
       headers: {
       'Content-Type': 'application/json'
       },
       body: JSON.stringify({password, email})
   })
   .then((res) => getResponseData(res))
   .then((res) => {
       return res;
   })
   .catch((err) => console.log(err));
   }; 

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then((res) => getResponseData(res))
    .then((data) => {
        localStorage.setItem('jwt', data.token);
        return data;
    })
    .catch(err => console.log(err))
  };

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => getResponseData(res))
    .then(data => data)
    .catch((err) => {
      console.log(err);
    });
  } 