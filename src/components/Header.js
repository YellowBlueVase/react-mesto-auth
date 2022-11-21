import {Link, Switch, useHistory, Route} from "react-router-dom";

function Header({ userProfile, setLoggedIn }) {
  const history = useHistory();

  function signOut(){
    localStorage.removeItem('jwt');
    userProfile.setAuthEmail('');
    history.push('/signin');
    setLoggedIn(false)
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__profile-box">
          <Switch>
            <Route exact path="/">
              <div className="header__user-profile">{userProfile.authEmail}</div>
              <button className='header__button header__button_gray' onClick={signOut}>Выйти</button>
            </Route>
            <Route exact path="/signup">
              <Link to="/signin" className='header__button header__button_white'>Войти</Link>
            </Route>
            <Route path="/signin">
              <Link to="/signup" className='header__button header__button_white'>Регистрация</Link>
            </Route>

        </Switch>
      </div>
    </header>
  );
}

export default Header;
