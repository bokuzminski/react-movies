import React from "react";
import "../App.css";
import { Link } from "react-router-dom";


function FilmItem({ film }) {
  return (
    <div>
      <div className="moviePoster">
        {/* {film.map((f) => (
          <div key={f.id} id="container">
            <Link to={`/${f.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w342/${f.poster_path}`}
                alt="#"
              ></img>
            </Link>
            <div className="title">{f.title}</div>
          </div>
        ))} */}
        {Object.entries(film).map(([slug, { id, title, poster_path }]) => (
          <div key={id} id="container">
            <Link to={`/${id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
                alt="#"
              ></img>
            </Link>
            <div className="title">{title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilmItem;

//https://via.placeholder.com/250x380?text=Movie+Poster
//<Modal key={f.id} show={modal} handleClose={hideModal} film={f} />
