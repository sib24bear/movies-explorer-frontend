import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import { moviesExamples } from '../../utils/CONSTANTS';

function App() {
  const body = document.body;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [runPreloader, setRunPreloader] = useState(false);

  const history = useHistory();

  function disableScroll() {
    isMenuOpen ? body.classList.add("no-scroll") : body.classList.remove("no-scroll");
  }

  useEffect(() => {
    disableScroll();
  });

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/movies">
          <Header
            loggedIn={true}
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
          />
          <Movies
            isLiked={true}
            isSaved={false}
            moviesList={moviesExamples}
            isPreloader={runPreloader}
            onPreloader={setRunPreloader}
          />
        </Route>
        <Route exact path="/saved-movies">
          <Header
            loggedIn={true}
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
          />
          <Movies
            isLiked={false}
            isSaved={true}
            moviesList={moviesExamples}
          />
        </Route>
        <Route exact path="/profile">
          <Header
            loggedIn={true}
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
          />
          <Profile />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route path="*">
          <PageNotFound history={history}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
