import React, { useEffect, useState } from 'react';
import axios from "axios";
import SingleContent from '../SingleContent/SingleContent';
import Pagination from '../Pagination/Pagination';
import Genres from '../Genres/Genres';
import useGenres from '../../Hooks/useGenre';

const Series = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const URLGenre = useGenres(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${URLGenre}`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);    //we wont set limited no. of pages //we'll show as much movies fetched from api(eg. 1000) // we'll set numOfpages = total_pages (i.e a property fetches from api)
  }

  useEffect(() => {
    window.scroll(0,0);
    fetchMovies();
    // eslint-disable-next-line
  }, [page,URLGenre])

  return (
    <div>
        <span className='pageTitle'>TV Series</span>
        <Genres type ='tv' selectedGenres={selectedGenres} genres={genres} setGenres={setGenres} setSelectedGenres={setSelectedGenres} setPage={setPage} />
        <div className="trending">
        {content && 
          content.map((tv) => 
          //load card for each movie/series and send props
            <SingleContent 
            key = {tv.id}
            id = {tv.id}
            poster = {tv.poster_path}
            title = {tv.title || tv.name}     //for movie its 'title' and for series its 'name' 
            date = {tv.first_air_date || tv.release_date}   //for movie its 'first_air_date' and for series its 'release_date' 
            media_type = "tv"
            vote_average = {tv.vote_average}
            /> )}
          {/* //if numOfPages greater 1 then only render pagination incase the pages fetched from api are over */}
        </div>
        {numOfPages > 1 && (
          <Pagination setPage = {setPage} numOfPages={numOfPages}/>
        )} 
    </div>
  )
}

export default Series