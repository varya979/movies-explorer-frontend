import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { moviesArr } from "../../utils/movies_array";
import { isLikedMovies } from "../../utils/saved-movies_array";
// import failImg from "../../images/fail.svg";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
// import Popup from "../Popup/Popup";
// import Figure from "../Figure/Figure";

export default function App() {

  const location = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(false);
  // const [isPopupOpen, setIsPopupOpen] = React.useState(true);

  // function openPopup() {
  //   setIsPopupOpen(true);
  // }

  // function closePopup() {
  //   setIsPopupOpen(false);
  // }

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
            <Header loggedIn={!loggedIn} />
            <Movies location={location} moviesArr={moviesArr}/>
            <Footer />
          </>
        }
        />

        <Route path="/saved-movies" element={
          <>
            <Header loggedIn={!loggedIn} />
            <SavedMovies location={location} isLikedMovies={isLikedMovies}/>
            <Footer />
          </>
        }
        />

        {/* <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} /> */}

        <Route path="*" element={<NotFoundPage />} />

      </Routes>

      {/* <Popup
        name="error"
        onClose={closePopup}
        isOpen={!openPopup}
        children={<Figure
          img={failImg}
          alt="Рисунок крестика"
          text="Вы ввели неправильный логин или пароль."
        />}
      /> */}
    </div>
  );
}
