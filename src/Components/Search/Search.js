import { Button, Tab, Tabs, TextField } from '@material-ui/core'
import { React, useState, useEffect } from 'react'
import axios from "axios";
import SingleContent from '../SingleContent/SingleContent';
import Pagination from '../Pagination/Pagination';
import SearchIcon from '@material-ui/icons/Search'

const Search = () => {

  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);

  setContent(data.results);
  setNumOfPages(data.total_pages);
  // console.log(data.results);

  };

  useEffect(() => {
    window.scroll(0,0);
    fetchSearch();
     // eslint-disable-next-line
  }, [type, page, searchText]);
  
  

  return (
    <div>
    {/* // fetched textbox , button and search icon from material ui */}
      <div style={{ display: "flex", margin: "15px 0" }}>
        <TextField
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)} />

        <Button variant="contained" style={{ marginLeft: 10 }} onClick={fetchSearch} >
          <SearchIcon />
        </Button>
      </div>
      <Tabs value = {type} indicatorColor = "primary" textColor = "primary" style = {{paddingBottom: 8}}
       onChange = {(event,newValue) => {
         setType(newValue);
          setPage(1)}}>
          <Tab style = {{ width: "50%"}} label = "Search Movies"/>
          <Tab style = {{ width: "50%"}} label = "Search TV series"/>
      </Tabs>
      <div className="trending">
        {content && 
          content.map((search) => 
          //load card for each movie/series and send props
            <SingleContent 
            key = {search.id}
            id = {search.id}
            poster = {search.poster_path}
            title = {search.title || search.name}     //for movie its 'title' and for series its 'name' 
            date = {search.first_air_date || search.release_date}   //for movie its 'first_air_date' and for series its 'release_date' 
            media_type = {type ? "tv" : "movie"}    //if '1' then media_type = "tv" else "movie"
            vote_average = {search.vote_average}
            /> )}
            {searchText && !content && 
            (type ? <p> No Series Found</p> : <p>No Movies Found</p>)}  
          {/* //if numOfPages greater 1 then only render pagination incase the pages fetched from api are over */}
        </div>
        {numOfPages > 1 && (
          <Pagination setPage = {setPage} numOfPages={numOfPages}/>
        )} 

    </div>
  )
}

export default Search