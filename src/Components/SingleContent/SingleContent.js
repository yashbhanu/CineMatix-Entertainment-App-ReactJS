import React from 'react'
import {Badge} from '@material-ui/core'
import {img300, unavailable} from '../../config'
import './SingleContent.css';
import InfoModal from '../InfoModal/InfoModal';

const SingleContent = ({ id, poster, title, date, media_type, vote_average}) => {
  return (
    // load the modal component and send props (everything inside the InfoModal are its children)
    <InfoModal media_type={media_type} id={id}>
    <Badge badgeContent = {vote_average} color={vote_average > 6 ? "secondary" : "primary"}/>   
        <img className="poster" src= {poster? `${img300}/${poster}` : unavailable} alt={title} />
        <b className="title">{title}</b>
        <span className="subtitle">
            {media_type === "tv" ? "TV Series" : "Movies"}
            <span className="subtitle">{date}</span>
        </span>
      </InfoModal>
  );
}

export default SingleContent