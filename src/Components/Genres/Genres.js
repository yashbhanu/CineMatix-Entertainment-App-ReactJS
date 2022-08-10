import { Chip } from '@material-ui/core';
import React, { useEffect } from 'react';
import axios from "axios";

const Genres = ({
    genres,
    selectedGenres,
    setSelectedGenres,
    setGenres,
    setPage,
    type
 }) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    }

    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
        setGenres([...genres, genre]);
        setPage(1);
    }

    //get all genres by specifying type (i.e movie or TV series) from api
    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`);

        setGenres(data.genres);
        // console.log(data.genres);
    }

    useEffect(() => {
    fetchGenres();
      //optional (similar to getUnMount) //whenever we change the page we want the genre to unmount (i.e cancel the api key call)
    //   return () => {
    //       setGenres({});
    //   };
     // eslint-disable-next-line
    }, [])
    

  return (
    <div style = {{padding: "6px 0"}}>
        {selectedGenres.map((genre) => (
            <Chip
                style = {{margin: 2}}
                key = {genre.id}
                label = {genre.name}
                color = "secondary"
                size = "small"
                clickable
                onDelete={() => handleRemove(genre)}
            />
        ))}
        {genres.map((genre) => (
            <Chip
                style = {{margin: 2}}
                key = {genre.id}
                label = {genre.name}
                size = "small"
                clickable
                onClick = {() => handleAdd(genre)}
            />
        ))}
    </div>
  )
}

export default Genres