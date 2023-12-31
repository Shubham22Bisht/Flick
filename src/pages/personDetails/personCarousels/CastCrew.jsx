import React from 'react';
import "./style.scss";
import Carousel from '../../../components/carousel/Carousel';
import { useFetch } from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
const CastCrew = () => {
  const {id}=useParams();
  const {data,loading}=useFetch(`/person/${id}/combined_credits`);
  console.log(data);
  return (
    <div className="CastCrew">
     {data?.cast?.length>0 && (
      <Carousel 
      title={"Popular Movies"}
      data={data?.cast}
      loading={loading}
      endpoint={"movie"}
      />
     )} 
     {data?.crew?.length>0 && (
      <Carousel
      title={"Popular TV Shows"}
      data={data?.crew}
      loading={loading}
      endpoint={"tv"}
      />
     )}
    </div>
  )
}

export default CastCrew