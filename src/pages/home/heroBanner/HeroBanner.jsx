import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import "./style.scss";
import { Img } from "../../../components/lazyLoadImage/Img";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
export const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/popular");
  const { url } = useSelector((state) => state.home);
  
  useEffect(() => {
    const  bg = url.backdrop+
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path ;
    setBackground(bg);
  }, [url,data]);
  const searchQueryHandler = (event) => {
    if (event.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  
  return (
    <div className="heroBanner">


        {!loading && (
          <div className="backdrop-img">
            <Img src={background}/>
          </div>
        )}

        <div className="opacity-layer">

        </div>
      <ContentWrapper>  
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Movies , Web Series , Tv Shows and Many More
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or web series..."
              onKeyUp={searchQueryHandler}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};
