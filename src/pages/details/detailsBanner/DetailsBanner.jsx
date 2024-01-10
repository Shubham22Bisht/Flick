import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { FaClipboardList, FaHeart } from "react-icons/fa";
import { RiDeleteBin3Line } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import "./style.scss";

import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { useFetch } from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import { Img } from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn.jsx";
import VideoPopup from "../../../components/videoPopup/VideoPopup.jsx";
import { db, auth } from "../../../firebaseCongif.js";
import {
  addDoc,
  collection,
  query,
  where,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [likes, setLikes] = useState(null);
  const [hasUserAddedToWatchlist, setHasUserAddedToWatchlist] = useState(false);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const likesRef = collection(db, "likes");
  const movieCollectionRef = collection(db, "movie");
  const tvCollectionRef = collection(db, "tv");

  const likesDoc = query(
    likesRef,
    where("mediaType", "==", mediaType),
    where("id", "==", id)
  );
  const mediaDoc =
    auth?.currentUser &&
    query(
      mediaType == "movie" ? movieCollectionRef : tvCollectionRef,
      where("author.id", "==", auth?.currentUser?.uid),
      where("id", "==", id)
    );

  const _genres = data?.genres?.map((g) => g.id);

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: auth?.currentUser?.uid,
        userName: auth?.currentUser?.displayName,
        mediaType,
        id,
      });
      if (auth?.currentUser) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: auth?.currentUser?.uid, likeId: newDoc.id }]
            : [{ userId: auth?.currentUser?.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("userId", "==", auth?.currentUser?.uid),
        where("mediaType", "==", mediaType),
        where("id", "==", id)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (auth?.currentUser) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find(
    (like) => like.userId === auth?.currentUser?.uid
  );

  const getUserAddedToWatchlist = async () => {
    const item = await getDocs(mediaDoc);
    if (item.docs.length > 0) setHasUserAddedToWatchlist(true);
  };

  useEffect(() => {
    getUserAddedToWatchlist();
    getLikes();
  }, [auth?.currentUser]);

  const addToWatchlist = async () => {
    try {
      !hasUserAddedToWatchlist &&
        (await addDoc(
          mediaType === "movie" ? movieCollectionRef : tvCollectionRef,
          {
            author: {
              name: auth.currentUser.displayName,
              id: auth.currentUser.uid,
            },
            id,
            mediaData: {
              poster_path: data.poster_path,
              release_date: data?.release_date || data?.first_air_date,
              media_type: mediaType,
              id: data.id,
              vote_average: data.vote_average,
              title: data.title || data.name,
            }
          }
        ));
      setHasUserAddedToWatchlist(true);
    } catch (err) {
      console.log(err);
    }
  };
  const removeFromWatchlist = async () => {
    try {
      const itemToDeleteQuery = query(
        mediaType === "movie" ? movieCollectionRef : tvCollectionRef,
        where("author.id", "==", auth?.currentUser?.uid),
        where("id", "==", id)
      );
      const itemToDeleteData = await getDocs(itemToDeleteQuery);
      const itemToDeleteId = itemToDeleteData.docs[0].id;
      const itemToDelete = doc(
        db,
        mediaType === "movie" ? "movie" : "tv",
        itemToDeleteId
      );
      await deleteDoc(itemToDelete);
      setHasUserAddedToWatchlist(false);
    } catch (err) {
      console.log(err);
    }
  };
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  const director = crew?.filter((f) => f.job === "Director");

  const writer = crew?.filter(
    (f) => f.job === "Writer" || f.job === "Screenplay" || f.job === "Story"
  );

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data?.backdrop_path} />
              </div>
              <div className="opactiy-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.name || data?.title}
                            (${dayjs(data?.release_date).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data?.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data?.vote_average.toFixed(1)} />
                      {!hasUserAddedToWatchlist ? (
                        <FaClipboardList
                          className="addToWatchlist"
                          onClick={() => {
                            auth?.currentUser && addToWatchlist(mediaType, id);
                          }}
                        />
                      ) : (
                        <RiDeleteBin3Line
                          className="removeFromWatchlist"
                          onClick={() =>
                            auth?.currentUser &&
                            removeFromWatchlist(mediaType, id)
                          }
                        />
                      )}
                      <div className="userFeedback">
                        {hasUserLiked ? (
                          <AiFillDislike
                            className="dislike"
                            onClick={() => {
                              removeLike();
                            }}
                          />
                        ) : (
                          <AiFillLike
                            className="like"
                            onClick={() => {
                              addLike();
                            }}
                          />
                        )}
                        {likes && (
                          <p className="userFeedbackInfo">
                            {" "}
                            Likes: {likes.length}{" "}
                          </p>
                        )}
                      </div>

                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video?.key);
                        }}
                      >
                        <PlayIcon />
                        <span>Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.overview}</div>
                    </div>
                    <div className="info">
                      {data?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data?.status}</span>
                        </div>
                      )}
                      {data?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data?.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer?.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by?.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
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

export default DetailsBanner;
