import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from "axios";
import {img500, unavailable} from "../../config";
import './InfoModal.css';
import { Button } from '@material-ui/core';
import { YouTube } from '@material-ui/icons';
import Carousal from '../Carousal/Carousal';
import "./InfoModal.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:"79%",
    height: "80%",
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #282c34',
    borderRadius: 10,
    color: '#28282B',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

//accepts the props children  (everything inside the InfoModal are its children`(i.e badge, image, b, span) //load all chilren inside the button of modal ), media  , type
export default function InfoModal({children, media_type, id}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchInfo = async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`);
      setContent(data);
      // console.log(data);
  }

  const fetchVideo = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`);
    setVideo(data.results[0]?.key);     //fetch the key of the youtube video if its exists
    // console.log(data);
}

    useEffect(() => {
     fetchInfo();
     fetchVideo();
     // eslint-disable-next-line
    }, [])
    

  return (
    <>
    {/* load all chilren(i.e singleContent) inside the button of modal */}
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        {content && (
          <div className={classes.paper}>
            <div className="InfoModal">
                <img src={content.poster_path ? `${img500}/${content.poster_path}` : unavailable}
                alt = {content.name || content.title} className="modalPortrait" />
                
                <img src={content.backdrop_path ? `${img500}/${content.backdrop_path}` : unavailable}
                alt = {content.name || content.title} className="modalLandscape" />

                <div className="modalAbout">
                    <span className="modalTitle"> {content.name || content.title} ( {(content.first_air_date || content.release_date || "----" ).substring(0,4) }) </span>

                    {content.tagline && ( <i className="tagline">{content.tagline}</i>)}

                    <span className="modalDesc">{content.overview}</span>

                    <div>
                      <Carousal media_type = {media_type} id= {id}/>
                    </div>

                    <Button variant='contained' startIcon = {<YouTube />}
                    color='secondary'
                    target='_blank'
                    href = {`https://www.youtube.com/watch?v=${video}`}>
  	                    Watch the Trailer
                    </Button>
                </div>
            </div>
          </div>
        )}
        </Fade>
      </Modal>
    </>
  );
}
