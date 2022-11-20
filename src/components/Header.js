import React from "react";
import {Link, useHistory, useLocation} from "react-router-dom";

function Header({ userProfile, loggedIn, setLoggedIn }) {
  const currentPath = useLocation();
  const history = useHistory();

  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/signin');
    setLoggedIn(false)
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__profile-box">
        {loggedIn && <div className="header__user-profile">{userProfile}</div>}
        <div
          className={`header__button ${
            loggedIn ? "header__button_gray" : "header__button_white"
          }`}
        >
          {loggedIn ? <button onClick={signOut}>Выйти</button> :
          currentPath.pathname === "/signup" ? <Link to="/signin">Войти</Link> :
          currentPath.pathname === "/signin" && <Link to="/signup">Регистрация</Link>}
        </div>
      </div>
    </header>
  );
}

export default Header;
