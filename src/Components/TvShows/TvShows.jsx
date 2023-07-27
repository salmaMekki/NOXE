import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TvShows() {
  let [trendingTvShows, setTrendingTvShows] = useState([]);
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let [movie, setMovie] = useState([]);
  let nums = new Array(13).fill(1).map((element, index) => index + 1);
  const navigate = useNavigate();

  let baseUrl = "https://image.tmdb.org/t/p/original/";
  async function getTrendingItems(pageNumber) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&api_key=955f0c05b120ec6e64af5c7bad730e85&page=${pageNumber}&sort_by=popularity.desc`
    );

    setTrendingTvShows(data.results);
  }

  function goToDetails(id) {
    navigate({
      pathname: "/details",
      search: `?id=${id}`,
    });
  }

  function getSearchValue(e) {
    setSearchValue(e.target.value);
  }

  async function search() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=955f0c05b120ec6e64af5c7bad730e85&query=${searchValue}`
    );
    setMovie(data.results);
  }

  useEffect(() => {
    getTrendingItems(1);
    search();
  }, [searchValue]);

  return (
    <>
      <input
        className="form-control my-5 "
        type="search"
        placeholder="Search"
        onChange={getSearchValue}
        value={searchValue}
        aria-label="Search"
      />
      {movie.length > 0 ? (
        <>
          <div className="row">
            {movie.map((mo) => (
              <div className="col-md-2" key={mo.id}>
                <div onClick={() => goToDetails(mo.id)} className="movie">
                  <span className="position-absolute bg-info text-white p-2 ">
                    {mo.vote_average}
                  </span>

                  <img
                    className="w-100 mb-2 "
                    src={baseUrl + mo.poster_path}
                    alt="movie's image"
                  />

                  <h2 className="h6 fw-bold"> {mo.original_name}</h2>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
  {trendingTvShows.length>0?  
        <div className="row my-5">
            <div className="col-md-4 my-4 ">
              <div className="title w-75">
                <h3 className="fw-bold">
                  Trending <br /> Tv Shows <br /> To Watch now
                </h3>
                <p > most watched movies by day</p>
              </div>
            </div>
            {trendingTvShows.map((trendTv) => (
              <div className="col-md-2" key={trendTv.id}>
                <div onClick={() => goToDetails(trendTv.id)} className="movie">
                  <span className="position-absolute bg-info text-white p-2 ">
                    {trendTv.vote_average}
                  </span>

                  <img
                    className="w-100 mb-2 "
                    src={baseUrl + trendTv.poster_path}
                    alt="movie's image"
                  />

                  <h2 className="h6 fw-bold"> {trendTv.original_name}</h2>
                </div>
              </div>
            ))}
          </div>:(
              <>
              <div className="vh-100 d-flex justify-content-center text-white align-items-center">
                <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
              </div>
            </>
          )}
        </>
      )}

      <nav aria-label="..." className="py-5">
        <ul className="pagination pagination-sm d-flex justify-content-center ">
          {nums.map((pageNum) => (
            <li
              key={pageNum}
              onClick={() => getTrendingItems(pageNum)}
              className="page-item"
            >
              <a className="page-link bg-transparent">{pageNum}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
