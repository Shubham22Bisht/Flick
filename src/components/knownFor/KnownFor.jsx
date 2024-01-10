import React from 'react';
import "./style.scss";
const KnownFor = ({data}) => {
  return (
    <div className="knownFor">
      {data?.map((media,index)=>{
        if(index===2)return ;
        return (
          <div className="mediaItem" key={index}>
            {media?.title || media?.original_title}
          </div>
        )
      })}
    </div>
  )
}

export default KnownFor;