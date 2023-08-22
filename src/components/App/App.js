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
import MessagePopup from "../MessagePopup/MessagePopup";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import apiMain from "../../utils/MainApi";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [apiErrorMessage, setApiErrorMessage] = React.useState("");
  const [apiSuccessMessage, setApiSuccessMessage] = React.useState("");
  const [isApiMessagePopupOpen, setIsApiMessagePopupOpen] =
    React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
          location === "/signin" || location === "/signup"
            ? navigate("/movies")
            : navigate(location);
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      apiMain
        .getMyUser()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function handleRegister(name, email, password) {
    return auth
      .register(name, email, password)
      .then(() => {
        handleLogIn(email, password);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        err.includes("409")
          ? setApiErrorMessage("Пользователь с таким email уже существует.")
          : setApiErrorMessage("При регистрации пользователя произошла ошибка");
      });
  }

  function handleLogIn(email, password) {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        err.includes("401")
          ? setApiErrorMessage("Вы ввели неправильный логин или пароль.")
          : setApiErrorMessage("При авторизации произошла ошибка.");
      });
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("searchInputValue");
    localStorage.removeItem("checkboxValue");
    setApiErrorMessage("");
    setIsLoggedIn(false);
  }

  function handleUpdateUser(data) {
    apiMain
      .updateUser(data)
      .then((res) => {
        setCurrentUser(res);
        handleApiMessagePopupOpen("Профиль пользователя успешно обновлен.");
      })
      .catch((err) => {
        err.includes("409")
          ? setApiErrorMessage("Пользователь с таким email уже существует.")
          : setApiErrorMessage("При обновлении профиля произошла ошибка.");
      });
  }

  function handleApiMessagePopupOpen(apiMessage) {
    setIsApiMessagePopupOpen(true);
    setApiSuccessMessage(apiMessage);
  }

  function handleApiMessagePopupClose() {
    setIsApiMessagePopupOpen(false);
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
                    <Movies
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                      location={location}
                      moviesArr={moviesArr}
                      setApiErrorMessage={setApiErrorMessage}
                      apiErrorMessage={apiErrorMessage}
                    />
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
                    <Profile
                      apiErrorMessage={apiErrorMessage}
                      setApiErrorMessage={setApiErrorMessage}
                      handleUpdateUser={handleUpdateUser}
                      handleLogOut={handleLogOut}
                      isLoggedIn={isLoggedIn}
                    />
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
                  handleLogIn={handleLogIn}
                  apiErrorMessage={apiErrorMessage}
                  setApiErrorMessage={setApiErrorMessage}
                  isLoggedIn={isLoggedIn}
                  navigate={navigate}
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
                  apiErrorMessage={apiErrorMessage}
                  setApiErrorMessage={setApiErrorMessage}
                  isLoggedIn={isLoggedIn}
                  navigate={navigate}
                />
              </div>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <MessagePopup
          isOpen={isApiMessagePopupOpen}
          onClose={handleApiMessagePopupClose}
          apiSuccessMessage={apiSuccessMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
