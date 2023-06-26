import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { moviesArr } from "../../utils/movies_array";
import { isLikedMovies } from "../../utils/saved-movies_array";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export default function App() {

  const location = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(false);

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
    </div>
  );
}
