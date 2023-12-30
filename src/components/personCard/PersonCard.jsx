import React from 'react'
import "./style.scss";
import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { ContentWrapper } from '../contentWrapper/ContentWrapper';
import { useSelector } from 'react-redux';
import { Img } from '../lazyLoadImage/Img';
import PosterFallback from "../../assets/no-poster.png";
const PersonCard = () => {
  const {id}=useParams();
  const {url}=useSelector((state)=>state.home);
  const {data,loading}=useFetch(`/person/${id}`);
  const {data:imagesData,loading:imagesDataLoading}=useFetch(`/person/${id}/images`);
  console.log(data?.biography);
  return (
    <div className="personCard">
      {!loading ?(
        <>
        <React.Fragment>
          <div className="backdrop-img">
            <Img src={url.backdrop+data?.profile_path} />
          </div>
          <div className="opactiy-layer"></div>
          <ContentWrapper>
            <div className="content">
              <div className="left">
                {data?.profile_path?(
                  <Img className="posterImg" src={  url?.profile+imagesData?.profiles[Math.floor(Math.random()*(imagesData?.profiles?.length))].file_path}/>
                ):(
                  <Img src={PosterFallback}
                  className="posterImg"/>
                )}
              </div>
              <div className="right">
                <div className="title">
                 {data?.name}
                </div>
                <div className="overview">
                  <div className="heading">
                   Biography
                  </div>
                  <div className="description">
                    {data?.biography}
                  </div>
                </div>
              </div>
            </div>
          </ContentWrapper>
        </React.Fragment>
        </>
      ):(
        <div>
          Not laoded
        </div>
      )}
    </div>
  )
}

export default PersonCard;