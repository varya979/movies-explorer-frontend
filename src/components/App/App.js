import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { moviesArr } from "../../utils/movies_array";
import { isLikedMovies } from "../../utils/saved-movies_array";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import FormPageHeader from "../FormPageHeader/FormPageHeader";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
  });
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [isRegistered, setIsRegistered] = React.useState(false);
  const [apiError, setApiError] = React.useState("");
  const [email, setEmail] = React.useState("pochta@yandex.ru");
  const [password, setPassword] = React.useState("123456789656575");
  const [name, setName] = React.useState("Виталий");
  const [isInputHasError, setIsInputHasError] = React.useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
    navigate("/movies");
  }

  function handleRegister(name, email, password) {
    return auth
      .register(name, email, password)
      .then(() => {
        // поменять на функцию регистрации
        setIsLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        setIsLoggedIn(false);
        err.includes("409")
          ? setApiError("Пользователь с таким email уже существует.")
          : setApiError("При регистрации пользователя произошла ошибка");
      });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />
                <Footer />
              </>
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute
                path="/movies"
                isLoggedIn={isLoggedIn}
                component={
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <Movies location={location} moviesArr={moviesArr} />
                    <Footer />
                  </>
                }
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                path="/saved-movies"
                isLoggedIn={isLoggedIn}
                component={
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <SavedMovies
                      location={location}
                      isLikedMovies={isLikedMovies}
                    />
                    <Footer />
                  </>
                }
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                path="/profile"
                isLoggedIn={isLoggedIn}
                component={
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <Profile isInputHasError={isInputHasError} />
                  </>
                }
              />
            }
          />

          <Route
            path="/signin"
            element={
              <div className="page">
                <FormPageHeader title={"Рады видеть!"} />
                <Login
                  handleLogin={handleLogin}
                  email={email}
                  handleChangeEmail={handleChangeEmail}
                  password={password}
                  handleChangePassword={handleChangePassword}
                />
              </div>
            }
          />

          <Route
            path="/signup"
            element={
              <div className="page">
                <FormPageHeader title={"Добро пожаловать!"} />
                <Register
                  handleRegister={handleRegister}
                  apiError={apiError}
                  setApiError={setApiError}
                />
              </div>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}
