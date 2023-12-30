import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import {ContentWrapper} from "../../../components/contentWrapper/ContentWrapper";
import {Img} from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";
import { useNavigate } from "react-router-dom";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    const navigate=useNavigate();
    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Stars</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((item)=>{
                            let imgUrl=item?.profile_path ? url?.profile + item.profile_path:avatar;
                            return (
                                <div key={item.id}
                                className="listItem" onClick={()=>navigate(`/person/${item.id}`)}>
                                    <div className="profileImg">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                    <div className="name">
                                        {item.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;