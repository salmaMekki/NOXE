import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
export default function Details() {
  let [serachParams, setSearchParams] = useSearchParams();
  let [movie, setMovie] = useState({});
  let baseUrl = "https://image.tmdb.org/t/p/original/";
  let currentId = serachParams.get("id");
  async function getMovieDetails(media_type) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${currentId}?api_key=955f0c05b120ec6e64af5c7bad730e85&language=en-US`
    );
    setMovie(data);
  }
  useEffect(() => {
    getMovieDetails("movie");
  }, []);
  return (
    <>
      <div className="row my-5">
        <div className="col-md-5">
          <div className="poster">
            <img className="w-100" src={baseUrl + movie.poster_path} alt="" />
          </div>
        </div>
        <div className="col-md-7 mt-4">
          <h2>{movie.title}</h2>
          <h3 className="text-muted h5 mb-4">{movie.tagline}</h3>
          {movie.genres?.map((genre, indx) => (
            <span key={indx} className="bg-info text-white me-3 p-2 rounded-2">
              {genre.name}
            </span>
          ))}
               <div className="my-4 p-1">
          <h5 className="mb-4">vote:{movie.vote_average}</h5>
          <h5 className="mb-4">vote_count:{movie.vote_count}</h5>
          <h5 className="mb-4">popularity:{movie.popularity}</h5>
          <h5 className="mb-4">release_date:{movie.release_date}</h5>
      </div>
      <p className='text-muted w-75'>{movie.overview}</p>

        </div>
      </div>
    </>
  );
}
