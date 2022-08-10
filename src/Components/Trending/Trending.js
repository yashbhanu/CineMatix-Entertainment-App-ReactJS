import React, { useEffect } from 'react';
import {useState} from "react";
import axios from "axios";
import SingleContent from '../SingleContent/SingleContent';
import './Trending.css';
import Pagination from '../Pagination/Pagination';

const Trending = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_KEY}&page=${page}`
    );

    // console.log(data.results);

    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page])
  

  return (
    <div>
        <span className='pageTitle'>Trending</span>
        <div className="trending">
        {content && 
          content.map((trending) => 
          //load card for each movie/series and send props
            <SingleContent 
            key = {trending.id}
            id = {trending.id}
            poster = {trending.poster_path}
            title = {trending.title || trending.name}     //for movie its 'title' and for series its 'name' 
            date = {trending.first_air_date || trending.release_date}   //for movie its 'first_air_date' and for series its 'release_date' 
            media_type = {trending.media_type}
            vote_average = {Math.trunc(trending.vote_average)}
            /> )}
        </div> 
        <Pagination setPage = {setPage}/>
    </div>
  )
}

export default Trending