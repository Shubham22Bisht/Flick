import React from 'react'
import "./style.scss";
import PersonDetailsBanner from './personDetailsBanner/PersonDetailsBanner';
import CastCrew from './personCarousels/CastCrew';
const PersonDetails = () => {
  return (
    <div>
      <PersonDetailsBanner />
      <CastCrew />
    </div>
  )
}

export default PersonDetails