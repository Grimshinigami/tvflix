"use strict";

import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js";

import { sidebar } from "./sidebar.js";

import { createMovieCard } from "./movie-card.js";

import { search } from "./search.js";

const movieId = window.localStorage.getItem("movieId");

const mediatype = window.localStorage.getItem("mediaType");
console.log(mediatype)

const pageContent = document.querySelector("[page-content]");

sidebar();

const getGenres = function (genreList) {
  const newGenreList = [];

  for (const { name } of genreList) newGenreList.push(name);
  return newGenreList.join(", ");
};

const getCasts = function (castList) {
  const newCastList = [];

  for (let i = 0, len = castList.length; i < len && len && i < 10; i++) {
    const { name } = castList[i];
    newCastList.push(name);
  }
  return newCastList.join(", ");
};

const getDirectors = function (crewList) {
  const directors = crewList.filter(({ job }) => job === "Director");

  const directorList = [];
  for (const { name } of directors) directorList.push(name);
  return directorList.join(", ");
};

// returns only trailers and teasers as array
const filterVideos = function (videoList) {
  return videoList.filter(
    ({ type, site }) =>
      (type === "Trailer" || type === "Teaser") && site === "Youtube"
  );
};

// console.log(movieId)

fetchDataFromServer(
  `https://api.themoviedb.org/3/${mediatype}/${movieId}?api_key=${api_key}&append_to_response=casts,videos,images,releases,watch/providers`,
  function (movie) {
    console.log(mediatype=="movie")
    if(mediatype=="movie"){
    const {
      backdrop_path,
      poster_path,
      title,
      release_date,
      runtime,
      vote_average,
      releases: {
        countries: [{ certification }],
      },
      genres,
      overview,
      casts: { cast, crew },
      videos: { results: videos },
    } = movie;

    console.log(movie)
    // console.log(movie['videos']['results']['0']['key'])

    const trailers = function(keyss){
      let num1=0
      let ele=""
      for (const [key,value] of Object.entries(tt1)){
        if(num1<Object.keys(keyss).length && num1<3){
          ele+=`
          <a class="reff" href=https://youtube.com/watch?v=${movie['videos']['results'][num1]['key']}>Vid${num1+1}</a>
          `
        }
        else{
          break
        }
        ++num1
      }
      return ele
    }
    const tt1=movie['videos']['results']
    // console.log(trailers(tt1) )

    const temp = function(ress){
      const textt="Platform Information currently unavailable"
      if(Object.keys(ress).length===0){
        return "javascript:alert('Unavailable');"
      }
      else{
        const tt=movie['watch/providers']['results']
        if("US" in tt){
          return tt['US']['link']
        }
        else{
          return "javascript:alert('Platform_Currently_Unavailable');"
        }
      }
    };
    const ress=movie['watch/providers']['results']
    
    // console.log(temp(ress))
    // console.log(movie['watch/providers']['results']['US']['link'])

    document.title = `${title} - Tvflix`;

    const movieDetail = document.createElement("div");
    movieDetail.classList.add("movie-detail");
    movieDetail.innerHTML = `
                <div 
                class="backdrop-image" 
                style="background-image: url('${imageBaseURL}${
      "w1280" || "original"
    }${backdrop_path || poster_path}')">
                </div>

                <figure class="poster-box movie-poster">
                <img
                    src="${imageBaseURL}w342${poster_path}"
                    alt="${title} poster"
                    class="img-cover"
                />
                </figure>

                <div class="detail-box">
                <div class="detail-content">
                    <h1 class="heading">${title}</h1>

                    <div class="meta-list">
                    <div class="meta-item">
                        <img
                        src="./assets/images/star.png"
                        width="20"
                        height="20"
                        alt="rating"
                        />
                        <span class="span">${vote_average.toFixed(1)}</span>
                    </div>

                    <div class="separator"></div>

                    <div class="meta-item">${runtime}m</div>

                    <div class="separator"></div>

                    <div class="meta-item">${release_date}</div>

                    <div class="meta-item card-badge">${certification}</div>
                    </div>

                    <p class="genre">${getGenres(genres)}</p>

                    <p class="overview">${overview}</p>

                    <ul class="detail-list">
                    <div class="list-item">
                        <p class="list-name">Starring</p>
                        <p>${getCasts(cast)}</p>
                    </div>

                    <div class="list-item">
                        <p class="list-name">Directed By</p>
                        <p>${getDirectors(crew)}</p>
                    </div>
                    </ul>
                    <div class="list-item">
                        <p class="list-name">Platforms</p>
                        <p><a class="reff" href=${temp(ress)}>Checkout available Platforms</a></p>
                    </div>
                </div>

                <div class="title-wrapper">
                    <h2 class="title-large">Trailer and Clips</h2>
                    <p>
                    ${trailers(tt1)}
                    </p>
                </div>

                <div class="slider-list">
                    <div class="slider-inner"></div>
                </div>
                </div>
    `;

    for (const { key, name } of filterVideos(videos)) {
      const videoCard = document.createElement("div");
      videoCard.classList.add("video-card");

      videoCard.innerHTML = `
        <iframe width="500" height="294" src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0" frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" loading="lazy"></iframe>
        `;

      movieDetail.querySelector(".slider-inner").appendChild(videoCard);
    }

    pageContent.appendChild(movieDetail);

    fetchDataFromServer(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}&page=1`,
      addSuggestedMovies
    );
  }
  else{
    const {
      backdrop_path,
      poster_path,
      title,
      name,
      release_date,
      runtime,
      vote_average,
      // releases: {
      //   countries: [{ certification }],
      // },
      genres,
      overview,
      // casts: { cast, crew },
      videos: { results: videos },
    } = movie;

    console.log(movie)
    // console.log(movie['name'])
    // console.log(movie['videos']['results']['0']['key'])

    const trailers = function(keyss){
      let num1=0
      let ele=""
      for (const [key,value] of Object.entries(tt1)){
        if(num1<Object.keys(keyss).length && num1<3){
          ele+=`
          <a class="reff" href=https://youtube.com/watch?v=${movie['videos']['results'][num1]['key']}>Vid${num1+1}</a>
          `
        }
        else{
          break
        }
        ++num1
      }
      return ele
    }
    const tt1=movie['videos']['results']
    // console.log(trailers(tt1) )

    const temp = function(ress){
      const textt="Platform Information currently unavailable"
      if(Object.keys(ress).length===0){
        return "javascript:alert('Unavailable');"
      }
      else{
        const tt=movie['watch/providers']['results']
        if("US" in tt){
          return tt['US']['link']
        }
        else{
          return "javascript:alert('Platform_Currently_Unavailable');"
        }
      }
    };
    const ress=movie['watch/providers']['results']
    
    // console.log(temp(ress))
    // console.log(movie['watch/providers']['results']['US']['link'])

    document.title = `${movie['name']} - Tvflix`;

    const creat = function(check){
      if(check!==undefined){
        return check['name']
      }
      else{
        return "Unavailable"
      }
    }
    console.log(creat(movie['created_by']['0']))
    const movieDetail = document.createElement("div");
    movieDetail.classList.add("movie-detail");
    movieDetail.innerHTML = `
                <div 
                class="backdrop-image" 
                style="background-image: url('${imageBaseURL}${
      "w1280" || "original"
    }${backdrop_path || poster_path}')">
                </div>

                <figure class="poster-box movie-poster">
                <img
                    src="${imageBaseURL}w342${poster_path}"
                    alt="${movie['name']} poster"
                    class="img-cover"
                />
                </figure>

                <div class="detail-box">
                <div class="detail-content">
                    <h1 class="heading">${movie['name']}</h1>

                    <div class="meta-list">
                    <div class="meta-item">
                        <img
                        src="./assets/images/star.png"
                        width="20"
                        height="20"
                        alt="rating"
                        />
                        <span class="span">${vote_average.toFixed(1)}</span>
                    </div>

                    <div class="separator"></div>

                    <div class="meta-item">${movie['number_of_seasons']} Seasons</div>

                    <div class="separator"></div>

                    <div class="meta-item">${movie['first_air_date']}</div>

                    <div class="meta-item card-badge"></div>
                    </div>

                    <p class="genre">${getGenres(genres)}</p>

                    <p class="overview">${overview}</p>

                    <ul class="detail-list">
                    <div class="list-item">
                        <p class="list-name">Starring</p>
                        <p></p>
                    </div>

                    <div class="list-item">
                        <p class="list-name">Created By</p>
                        <p>${creat(movie['created_by']['0'])}</p>
                    </div>
                    </ul>
                    <div class="list-item">
                        <p class="list-name">Platforms</p>
                        <p><a class="reff" href=${temp(ress)}>Checkout available Platforms</a></p>
                    </div>
                </div>

                <div class="title-wrapper">
                    <h2 class="title-large">Trailer and Clips</h2>
                    <p>
                    ${trailers(tt1)}
                    </p>
                </div>

                <div class="slider-list">
                    <div class="slider-inner"></div>
                </div>
                </div>
    `;

    for (const { key, name } of filterVideos(videos)) {
      const videoCard = document.createElement("div");
      videoCard.classList.add("video-card");

      videoCard.innerHTML = `
        <iframe width="500" height="294" src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0" frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" loading="lazy"></iframe>
        `;

      movieDetail.querySelector(".slider-inner").appendChild(videoCard);
    }

    pageContent.appendChild(movieDetail);

    fetchDataFromServer(
      `https://api.themoviedb.org/3/tv/${movieId}/recommendations?api_key=${api_key}&page=1`,
      addSuggestedMovies
    );
  }
}

);

const addSuggestedMovies = function ({ results: movieList }, title) {
  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list");
  movieListElem.ariaLabel = "You May Also Like";

  movieListElem.innerHTML = `
    <div class="title-wrapper">
      <h3 class="title-large">You May Also Like</h3>
    </div>

    <div class="slider-list">
      <div class="slider-inner"></div>
    </div>
  `;

  for (const movie of movieList) {
    // Called from movie_card.js
    const movieCard = createMovieCard(movie);

    movieListElem.querySelector(".slider-inner").appendChild(movieCard);
  }
  pageContent.appendChild(movieListElem);
};

search();
