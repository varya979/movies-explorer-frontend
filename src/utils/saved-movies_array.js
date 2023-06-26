import { moviesArr } from "./movies_array";

export const isLikedMovies = moviesArr.reduce((acc, currentValue) => {
  if(currentValue["isLiked"]) {
    acc.push(currentValue);
  }
  return acc;
}, []);

