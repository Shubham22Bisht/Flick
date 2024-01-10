import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebaseCongif";
import "./style.scss";
import { useSelector } from "react-redux";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import Carousel from "../../components/carousel/Carousel";
export const WatchList = () => {
  const [moviesToWatch, setMoviesToWatch] = useState([]);
  const [tvShowsToWatch, setTvShowsToWatch] = useState([]);
  const movieCollectionRef = collection(db, "movie");
  const tvCollectionRef = collection(db, "tv");
  const [moviesloading, setMoviesLoading] = useState(true);
  const [tvShowsLoading, setTvShowsLoading] = useState(true);
  const { url } = useSelector((state) => state.home);
  const movieQuery = query(
    movieCollectionRef,
    where("author.id", "==", auth?.currentUser?.uid)
  );
  const tvShowQuery = query(
    tvCollectionRef,
    where("author.id", "==", auth?.currentUser?.uid)
  );
  const getMovies = async () => {
    try {
      const userMovies = await getDocs(movieQuery);
      setMoviesToWatch(
        userMovies.docs.map((movie) => ({
          ...movie.data(),
        }))
      );
      setMoviesLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getTvShows = async () => {
    try {
      const userTvShows = await getDocs(tvShowQuery);
      setTvShowsToWatch(
        userTvShows.docs.map((tvShow) => ({
          ...tvShow.data(),
        }))
      );
      setTvShowsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
    getTvShows();
  }, []);

  return (
    <div className="watchlist">
      <ContentWrapper>
            <Carousel
              data={moviesToWatch}
              loading={moviesloading}
              title={"Movies In Your Watchlist"}
              endpoint={"movie"}
            />
            <Carousel
              data={tvShowsToWatch}
              loading={tvShowsLoading}
              title={"Web Series In Your WatchList"}
              endpoint={"tv"}
            />
         </ContentWrapper>
    </div>
  );
};
