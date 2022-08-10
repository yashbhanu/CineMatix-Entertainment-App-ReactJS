import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import SimpleBottomNavigation from './Components/MainNav/MainNav';
import Trending from './Components/Trending/Trending';
import Movies from './Components/Movies/Movies';
import Search from './Components/Search/Search';
import Series from './Components/Series/Series';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <div className="App">
      <Container>
        <Routes>
          <Route path="/" element = {<Trending/>} exact/>
          <Route path="/movies" element = {<Movies/>} />
          <Route path="/series" element = {<Series/>} />
          <Route path="/search" element = {<Search/>} />
        </Routes>
      </Container>
      <SimpleBottomNavigation/>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
