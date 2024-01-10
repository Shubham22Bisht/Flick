import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../components/spinner/Spinner";
import { PersonCard } from "../../components/personCard/PersonCard";
import "./style.scss";



export const Actors = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/person/popular`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/person/popular?page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results,...res?.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    fetchInitialData();
  }, []);


  return (
    <div className="popularActors">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">Popular Actors</div>
        </div>
        {loading && <Spinner initial={true}/>}
        {!loading && (
            <>
            {data?.results?.length >0 ?(
                <InfiniteScroll
                className="content"
                dataLength={data?.results.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner/>}>
                {data?.results?.map((item,index)=>{
                    return (
                        <PersonCard
                        key={index}
                        data={item}
                        />
                    )
                })}
                </InfiniteScroll>
            ):(
                <span className="resultNotFound">
                    Sorry , Results not found!
                </span>
            )}
            </>
        )}
      </ContentWrapper>
    </div>
  );
};
