import * as React from 'react';
import {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles"
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotSharpIcon from '@material-ui/icons/WhatshotSharp';
import LocalMoviesSharpIcon from '@material-ui/icons/LocalMoviesSharp';
import LiveTvSharpIcon from '@material-ui/icons/LiveTvSharp';
import SearchIcon from '@material-ui/icons/Search';
import { useNavigate } from 'react-router';

const useStyles = makeStyles({
    root: {
        width: "100%",
        position : "fixed",
        bottom:  0,
        background: "#white",
        zIndex: 100,
        boxShadow: "0 1px 5px black",
    },
})

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {

      if (value === 0) {
      navigate("/");
      document.title = "CineMatix - Trending";
      }
      else if (value === 1) {
        navigate("/movies");
        document.title = "CineMatix - Movies"
      }
      else if (value === 2) {
      navigate("/series");
      document.title = "CineMatix - TV Series"
      }
      else if (value === 3) { 
        navigate("/search");
        document.title = "CineMatix - Search"
      }
      
  }, [value, navigate]);

  
  

  return (
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className = {classes.root}
      >
        <BottomNavigationAction style = {{ color : "#28282B" }} label="Trending" icon={<WhatshotSharpIcon/>} />
        <BottomNavigationAction style = {{ color : "#28282B" }} label="Movies" icon={<LocalMoviesSharpIcon />} />
        <BottomNavigationAction style = {{ color : "#28282B" }} label="TV Series" icon={<LiveTvSharpIcon />} />
        <BottomNavigationAction style = {{ color : "#28282B" }} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
  );
}