import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import FilmItem from "./components/FilmItem";
import axios from "axios";

function App() {
  const [films, setFilms] = useState([]);

  const apiurl =
    "https://api.themoviedb.org/3/movie/popular?api_key=e366d974f73ae203397850eadc7bce1f"; //https://api.themoviedb.org/3/movie/popular?api_key=e366d974f73ae203397850eadc7bce1f

  useEffect(() => {
    axios.get(apiurl).then((response) => {
      setFilms(response.data.results);
    });
  }, []);

  const Snail = () => {
    const { slug } = useParams();
    const movObj = {
      title: "",
      overview: "",
      release_date: "",
      poster: "",
      vote_count: "",
      vote_average: "",
    };
    const movie = films;
    const newID = parseInt(slug);

    if (movie.length > 0) {
      console.log("here");
      for (let i = 0; i < movie.length; i++) {
        if (movie[i].id === newID) {
          movObj.title = movie[i].title;
          movObj.overview = movie[i].overview;
          movObj.release_date = movie[i].release_date;
          movObj.poster = movie[i].poster_path;
          movObj.vote_average = movie[i].vote_average;
          movObj.vote_count = movie[i].vote_count;
        }
      }
    }

    return (
      <div className="movieInfo">
        <h1>{movObj.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w342/${movObj.poster}`}
          alt="#"
        ></img>
        <p>{movObj.overview}</p>
        <h4>Release Date: {movObj.release_date}</h4>
        <p>
          Rated a {movObj.vote_average} average score from {movObj.vote_count} votes.
        </p>
      </div>
    );
  };

  function Home() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Router>
            <Switch>
              <Route path="/" exact render={() => <FilmItem film={films} />} />
              <Route path="/:slug" exact>
                <Snail></Snail>
              </Route>
            </Switch>
          </Router>
        </header>
      </div>
    );
  }

  return <Home />;
}

export default App;
