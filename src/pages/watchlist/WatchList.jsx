import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebaseCongif";
import "./style.scss";
import { useSelector } from "react-redux";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import Carousel from "../../components/carousel/Carousel";
import { Img } from "../../components/lazyLoadImage/Img";
import Nothing from "../../assets/no-results.png"
export const WatchList = () => {
  const [moviesToWatch, setMoviesToWatch] = useState([]);
  const [tvShowsToWatch, setTvShowsToWatch] = useState([]);
  const movieCollectionRef = collection(db, "movie");
  const tvCollectionRef = collection(db, "tv");
  const [moviesloading, setMoviesLoading] = useState(true);
  const [tvShowsLoading, setTvShowsLoading] = useState(true);
  const { url } = useSelector((state) => state.home);
  const movieQuery = auth?.currentUser && query(
    movieCollectionRef,
    where("author.id", "==", auth?.currentUser?.uid)
  );
  const tvShowQuery = auth?.currentUser && query(
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
    if(auth?.currentUser){
      getMovies();
      getTvShows();
    }
  return (
     auth.currentUser ? (
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
    ) :(
       <div className="emptyWatchlist">
         <Img  className="image" src={Nothing}/>
         <div className="content">
          Please Sign In !!
         </div>
         
       </div>
    )
  );
};
