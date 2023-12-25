import React from "react";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { useFetch } from "../../../hooks/useFetch";
import "../style.scss";
import { SwithTabs } from "../../../components/switchTabs/SwithTabs";
import { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
export const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/popular`);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Popular</span>
        <SwithTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results}
       loading={loading}
       endpoint={endpoint} />
    </div>
  );
};
