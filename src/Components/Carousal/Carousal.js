import { React, useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from "axios";
import { img300, noPicture } from "../../config"
import './Carousal.css';

const handleDragStart = (e) => e.preventDefault();


const Carousal = ( {media_type, id } ) => {

    const [cast, setCast] = useState([]);

    const items = cast?.map((cast) => (
        <div className="carousalItem">
            <img src={cast.profile_path ? `${img300}/${cast.profile_path}` : noPicture} alt={cast?.name} 
            onDragStart = {handleDragStart}
            className="carousalItem_img" />

            <b className="carousal_txt">{cast?.name}</b>
        </div>
    ));

    //to make carousel responsive // if '0' pixels then 3 items, of '512' pixels then 5 items...etc
    const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 5,
        },
        1024: {
          items: 7,
        },
      };

    const fetchCast = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`
        );

        setCast(data.cast);
    }

    useEffect(() => {
      fetchCast();
      // eslint-disable-next-line
    }, [])
    

  return (
    <AliceCarousel mouseTracking responsive= {responsive} items={items} infinite disableButtonsControls disableDotsControls autoPlay />
  );
};

export default Carousal;