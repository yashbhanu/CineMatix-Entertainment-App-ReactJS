import React from 'react'
import "./Header.css";

const Header = () => {
    //whenever clicked , it'll scroll to top
    return <span onClick={() => window.scroll(0,0)} className="header">💻 🎬 CineMatix 🎥 💻</span>
}

export default Header