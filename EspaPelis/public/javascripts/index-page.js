// public/javascripts/index-page.js
import { renderMovies } from './movie-cards.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.collection-body');

  fetch('/data/collection.json')
  .then(res => res.json())
  .then(movies => {
    const publicMovies = movies.filter(m => m.public === true);
    renderMovies({ movies: publicMovies, container, limit: 16 });
  });

});
