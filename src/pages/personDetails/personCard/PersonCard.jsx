import React from "react";
import "./style.scss";
import { useFetch } from "../../../hooks/useFetch";
import dayjs from "dayjs";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import { Img } from "../../../components/lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import CircleRating from "../../../components/circleRating/CircleRating";
import { useParams } from "react-router-dom";
import ImageCarousel from "../imageCarousel/ImageCarousel";
const PersonCard = () => {
  const {id}=useParams();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch(`/person/${id}`);
  const { data: imagesData, loading: imagesDataLoading } = useFetch(
    `/person/${id}/images`
  );
  console.log(imagesData);
  return (
    <div className="personCard">
      {!loading && !imagesDataLoading ? (
        <>
          <React.Fragment>
            <div className="backdrop-img">
              <Img src={url.backdrop + data?.profile_path} />
            </div>
            <div className="opactiy-layer"></div>
            <ContentWrapper>
              <div className="content">
                <div className="left">
                  {data?.profile_path ? (
                    <Img
                      className="posterImg"
                      src={
                        url?.profile +
                        imagesData?.profiles[
                          Math.floor(
                            Math.random() * imagesData?.profiles?.length
                          )
                        ].file_path
                      }
                    />
                  ) : (
                    <Img src={PosterFallback} className="posterImg" />
                  )}
                </div>
                <div className="right">
                  <div className="row">
                  <div className="title">{data?.name}</div>
                      <CircleRating rating={(data?.popularity/10).toFixed(1)} />
                    </div>
                    
                  <div className="info">
                    { data?.place_of_birth && (
                      <div className="infoItem">
                           <span className="text bold">
                            Place Of Birth:{" "}
                           </span>
                           <span className="text">
                            {data?.place_of_birth}
                           </span>
                      </div>
                    )
                    }
                    { data?.birthday && (
                      <div className="infoItem">
                           <span className="text bold">
                            Birthday:{" "}
                           </span>
                           <span className="text">
                            {dayjs(data?.birthday).format("MMM D, YYYY")}
                           </span>
                      </div>
                    )
                    }
                    { data?.gender && (
                      <div className="infoItem">
                           <span className="text bold">
                            Gender:{" "}
                           </span>
                           <span className="text">
                            {data?.gender===2?"Male":data?.gender===1?"Female":"Other"}
                           </span>
                      </div>
                    )
                    }
                    { data?.homepage && (
                      <div className="infoItem">
                           <span className="text bold">
                            Homepage:{" "}
                           </span>
                           <a href={data?.homepage} className="homepage">{data?.homepage}</a>
                      </div>
                    )
                    }
                    { data?.popularity && (
                      <div className="infoItem">
                           <span className="text bold">
                           popularity:{" "}
                           </span>
                           <span className="text">
                            {data?.popularity}
                           </span>
                      </div>
                    )
                    }
                  </div>
                  {
                      data?.also_known_as?.length>0 && (
                         <div className="info">
                          <div className="infoItem">
              
                          <span className="text bold">
                            AKA:{" "}
                          </span>
                          {data?.also_known_as?.map((name,i)=>{
                             return (
                              <span className="text" key={i}>
                               {((data?.also_known_as?.length)-1)!==i?`${name} ,`:`${name}`}
              
                              </span>
                             )
                          })}
                          </div>
                         </div>
                      )
                    }
                  <div className="overview">
                    <div className="heading">Biography</div>
                    <div className="description">{data?.biography}</div>
                  </div>
                </div>
                </div>
            </ContentWrapper>
            <ImageCarousel 
          className="imageCarousel"
          data={imagesData?.profiles}
          loading={imagesDataLoading}
          endpoint={"pics"}
          title={"Gallery"}
          />
          </React.Fragment>
        </>
      ) : (
        <div className="detailsBannerSkeleton">
         <ContentWrapper>
          <div className="leftskeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
         </ContentWrapper>
        </div>
      )}
      
    </div>
  );
};

export default PersonCard;
