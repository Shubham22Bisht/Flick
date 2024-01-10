import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Img } from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import avatar from "../../assets/avatar.png";
import "./style.scss";
import KnownFor from "../knownFor/KnownFor";

export const PersonCard = ({ data, fromSearch }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data?.profile_path
    ? url?.profile + data?.profile_path
    : avatar;

  return (
    <div className="personCard" onClick={() => navigate(`/person/${data?.id}`)}>
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl}/>
          {!fromSearch && (
            <React.Fragment>
              <CircleRating rating={(data?.popularity/25).toFixed(1)} />
              <KnownFor data={data?.known_for}/>
            </React.Fragment>
          )}
      </div>
      <div className="textBlock">
        <span className="title">{data?.name || data?.original_name}</span>
      </div>
    </div>
  );
};
