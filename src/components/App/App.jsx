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

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [register, setRegister] = React.useState(false);


  function handleLogin(evt) {
    setLoggedIn(true);
    navigate("/movies");
  }

  function handleRegister(evt) {
    setRegister(true);
    navigate("/signin");
  }

  return (
    <div className="app">
      <Routes>

        <Route path="/" element={
          <>
            <Header />
            <Main />
            <Footer />
          </>
        }
        />

        <Route path="/movies" element={
          <>
            <Header loggedIn={loggedIn} />
            <Movies location={location} moviesArr={moviesArr}/>
            <Footer />
          </>
        }
        />

        <Route path="/saved-movies" element={
          <>
            <Header loggedIn={loggedIn} />
            <SavedMovies location={location} isLikedMovies={isLikedMovies}/>
            <Footer />
          </>
        }
        />

        <Route path="/profile" element={
          <>
            <Header loggedIn={loggedIn} />
            <Profile />
          </>
        }
        />

        <Route path="/signin" element={
          <>
            <FormPageHeader title={"Рады видеть!"}/>
            <Login handleLogin={handleLogin}/>
          </>
        }
        />

        <Route path="/signup" element={
          <>
            <FormPageHeader title={"Добро пожаловать!"}/>
            <Register handleRegister={handleRegister}/>
          </>
        }
        />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </div>
  );
}
