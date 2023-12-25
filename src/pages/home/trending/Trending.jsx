import React  from "react";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { useFetch } from "../../../hooks/useFetch";
import "../style.scss";
import { SwithTabs } from "../../../components/switchTabs/SwithTabs";
import { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
export const Trending = () => {
  const [endpoint,setEndpoint]=useState("day");
  const {data,loading}=useFetch(`/trending/all/${endpoint}`);
  const onTabChange=(tab)=>{
     setEndpoint(tab==="Day"?"day":"week");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwithTabs data={["Day","Week"]} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  );
};
