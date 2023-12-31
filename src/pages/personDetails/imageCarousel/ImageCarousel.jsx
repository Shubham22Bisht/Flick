import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper.jsx";
import { Img } from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png"
import CircleRating from "../../../components/circleRating/CircleRating.jsx";
import "./style.scss";

const ImageCarousel = ({ data, loading ,endpoint,title }) => {
  const {id}=useParams();
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount=
    dir==="left"?container.scrollLeft-(container.offsetWidth+20)
    :container.scrollLeft+(container.offsetWidth+20);

    container.scrollTo({
        left:scrollAmount,
        behavior:"smooth"
    })
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {
          title && <div className="carouselTitle">{title}</div>
        }
      <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
      {!loading ? (
        <div className="carouselItems" ref={carouselContainer}>
          {data?.map((item) => {
            const posterUrl = item.file_path
              ? url.profile + item.file_path
              : PosterFallback;
            return (
              <div key={item.id} 
              className="carouselItem"
              onClick={()=>navigate(`/${item.media_type || endpoint }/${item.id}`)}>
                <div className="posterBlock" onClick={navigate(`/person/${id}`)}>
                  <a  href={posterUrl} target="_blank"><Img src={posterUrl}  /></a>
                  <CircleRating rating={item.vote_average.toFixed(1)} />
                </div>
              </div> 
            );
          })}
        </div>
      ) : (
        <div className="loadingSkeleton">
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
        </div>
      )}
      </ContentWrapper>
    </div>
  );
};

export default ImageCarousel;
