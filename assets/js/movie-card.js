"use strict";

import { imageBaseURL } from "./api.js";

// movie card

export function createMovieCard(movie) {
  console.log(movie)
  const { poster_path, title, vote_average, release_date,media_type, first_air_data, id } = movie;
  // console.log(movie)
  const datt = function(fieldd){
    if(fieldd['release_date']){
      return fieldd['release_date']
    }
    else{
      return fieldd['first_air_date']
    }
  }
  // console.log(datt(movie))
  // console.log(movie['media_type'])
  const t1 = function(fielld){
    if(fielld['media_type']==="movie"){
      return fielld['title']
    }
    else{
      return fielld['name']
    }
  }
  // console.log(t1(movie))

  const card = document.createElement("div");
  card.classList.add("movie-card");
  // mmedia(media_type)

  const med1=function(media_type){
    if(media_type===undefined){
      return "movie"
    }
    else{
      return media_type
    }
  }
  console.log(med1(media_type))

  const acttitle = function(title){
    console.log(title)
    if(title!==undefined){
      return title
    }
    else{
      console.log(movie['name'])
      return movie['name']
    }
  }
  console.log(acttitle(title))
  card.innerHTML = `
    <figure class="poster-box card-banner">
      <img
        src="${imageBaseURL}w342${poster_path}"
        alt="${title}"
        class="img-cover"
        loading="lazy"
      />
    </figure>

    <h4 class="title">${acttitle(title)}</h4>

    <div class="meta-list">
      <div class="meta-item">
        <img
          src="./assets/images/star.png"
          width="20"
          height="20"
          loading="lazy"
          alt="rating"
        />
        <span class="span">${vote_average.toFixed(1)}</span>
      </div>

      <div class="card-badge">${datt(movie)}</div>
    </div>

    <a href="./detail.html" class="card-btn" title="${t1(movie)}" onclick="getMovieDetail(${id}); ${mmedia(med1(media_type))};"></a>
  `;

  return card;
}
