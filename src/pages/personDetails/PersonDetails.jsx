import React from 'react'
import "./style.scss";
import PersonCard from './personCard/PersonCard';
import CastCrew from './personCarousels/CastCrew';
const PersonDetails = () => {
  return (
    <div>
      <PersonCard />
      <CastCrew />
    </div>
  )
}

export default PersonDetails