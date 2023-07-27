import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Home() {
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [trendingTvShows, setTrendingTvShows] = useState([]);
  const navigate = useNavigate();
  let baseUrl = "https://image.tmdb.org/t/p/original/";
  async function getTrendingItems(media_type, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${media_type}/day?api_key=955f0c05b120ec6e64af5c7bad730e85`
    );

    callback(data.results.slice(0, 10));
  }
  useEffect(() => {
    getTrendingItems("movie", setTrendingMovies);
    getTrendingItems("tv", setTrendingTvShows);
  }, []);
  function goToDetails(id) {
    navigate({
      pathname: "/details",
      search: `?id=${id}`,
    });
  }
  return (
    <>
      {trendingMovies.length > 0 ? (
        <>
          {/* movies  */}

          <div className="row my-5">
            <div className="col-md-4 my-4 ">
              <div className="title w-75">
                <h3 className="fw-bold">
                  Trending <br /> Movies <br /> To Watch now
                </h3>
                <p> most watched movies by day</p>
              </div>
            </div>
            {trendingMovies.map((trendMovie) => (
              <div className="col-md-2" key={trendMovie.id}>
                <div
                  onClick={() => goToDetails(trendMovie.id)}
                  className="movie"
                >
                  <span className="position-absolute bg-info text-white p-2 ">
                    {trendMovie.vote_average}
                  </span>

                  <img
                    className="w-100 mb-2 "
                    src={baseUrl + trendMovie.poster_path}
                    alt="movie's image"
                  />

                  <h2 className="h6 fw-bold"> {trendMovie.title}</h2>
                </div>
              </div>
            ))}
          </div>
          {/* tv shows */}

          <div className="row my-5">
            <div className="col-md-4 my-4 ">
              <div className="title w-75">
                <h3 className="fw-bold">
                  Trending <br /> Tv <br /> To Watch now
                </h3>
                <p> most watched movies by day</p>
              </div>
            </div>
            {trendingTvShows.map((trendTv) => (
              <div className="col-md-2" key={trendTv.id}>
                <div className="tv" onClick={() => goToDetails(trendTv.id)}>
                  <span className="position-absolute bg-info text-white p-2 ">
                    {trendTv.vote_average}
                  </span>

                  <img
                    className="w-100 mb-2 "
                    src={baseUrl + trendTv.poster_path}
                    alt="movie's image"
                  />

                  <h2 className="h6 fw-bold"> {trendTv.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="vh-100 d-flex justify-content-center text-white align-items-center">
            <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
          </div>
        </>
      )}
    </>
  );
}
