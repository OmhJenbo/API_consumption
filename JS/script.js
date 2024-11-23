"use strict";

const apiKey = "b6ea894cf12809b9a2df78b362af46c1";
const baseUrl = "https://api.themoviedb.org/3";

const nowPlayingButton = document.getElementById("now_playing");
const popularButton = document.getElementById("popular");
const topRatedButton = document.getElementById("top_rated");
const upcomingButton = document.getElementById("upcoming");

nowPlayingButton.addEventListener('click', function(event){
  event.preventDefault();
  fetchMovies('now_playing');
});
popularButton.addEventListener('click', function(event){
  fetchMovies('popular');
  event.preventDefault();
});
topRatedButton.addEventListener('click', function(event){
  fetchMovies('top_rated');
  event.preventDefault();
});
upcomingButton.addEventListener('click', function(event){
  fetchMovies('upcoming');
  event.preventDefault();
});

function fetchMovies(category) {
  const url = baseUrl + '/movie/' + category + '?api_key=' + apiKey;
  fetch(url)
        .then(function(response) {
            return response.json(); // Convert response to JSON format
        })
        .then(function(data) {
            displayMovies(data.results); // Call displayMovies with the results
        })
        .catch(function(error) {
            console.log('Error fetching data:', error); // Handle errors
        });
}
function displayMovies(movies) {
  const movieList = document.getElementById('movie_list');
  movieList.innerHTML = ''; // Clear any previous movie data

  // Loop through each movie and create a card for it
  for (let index = 0; index < movies.length; index++) {
      const movie = movies[index];

      // Create a new div for the movie card
      const movieCard = document.createElement('article');
      movieCard.classList.add('movie_card');

      // Add the movie details to the movie card
      movieCard.innerHTML = `
          <div>
          <div id="titleBackground">
          <h3>${movie.title}</h3>
          </div>
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
          <p><strong>Original title:</strong> ${movie.original_title}</p>
          <p><strong>Release date:</strong> ${movie.release_date}</p>
          <p>${movie.overview}</p>
          </div>
      `;

      // Add the movie card to the movie list section
      movieList.appendChild(movieCard);
  }
}
