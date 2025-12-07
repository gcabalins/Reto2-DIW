// Crea UNA card
 function createMovieCard(movie) {
  const card = document.createElement('div');
  card.classList.add('movie-card');
  const isLogged = document.body.dataset.logged === 'true';
  const detailsHref = isLogged
    ? `/details/${movie.id}`   
    : '/signin';

  card.innerHTML = `
    <div class="movie-image">
      <img src="${movie.image}" alt="${movie.title}" loading="lazy">
      <div class="overlay">
        <p class="format-type">
          <i class="fa-solid fa-compact-disc"></i>${movie.format}
        </p>
      </div>
    </div>
    <div class="movie-info">
      <h2 class="movie-title">${movie.title}</h2>
      <div class="year-category">
        <span class="movie-year">
          <i class="fa-solid fa-calendar"></i>${movie.year}
        </span>
        <span class="movie-category">${movie.category}</span>
      </div>
      <p class="director">
        <i class="fa-regular fa-user"></i>${movie.director}
      </p>
      <p class="description">${movie.description}</p>
      <div class="details-button">
        <a style="text-decoration: none; color: white;" class="btn-view-details" href="${detailsHref}">
        <button class="btn-view-details">
            <i class="fa-solid fa-eye"></i>Ver Detalles
        </button>
        </a>
      </div>
    </div>
  `;
  
  const stateElement = document.createElement('p');
  stateElement.textContent = `Estado: ${movie.state}`;
  stateElement.classList.add('state');

  switch ((movie.state || '').toLowerCase()) {
    case 'nuevo':
      stateElement.classList.add('state-new');
      break;
    case 'bueno':
      stateElement.classList.add('state-good');
      break;
    case 'malo':
      stateElement.classList.add('state-bad');
      break;
    default:
      stateElement.classList.add('state-unknown');
  }

  const movieInfo = card.querySelector('.movie-info');
  const detailsButton = movieInfo.querySelector('.details-button');
  movieInfo.insertBefore(stateElement, detailsButton);

  return card;
}

// Renderiza N películas con posibles filtros
export function renderMovies({
  movies,
  container,
  limit = null,
  filters = {}
}) {
  if (!container) return;

  let result = [...movies];

  // aplicar filtros opcionales
  if (filters.text) {
    const text = filters.text.toLowerCase();
    result = result.filter(m =>
      m.title.toLowerCase().includes(text) ||
      m.director.toLowerCase().includes(text) ||
      (m.category && m.category.toLowerCase().includes(text))
    );
  }

  if (filters.format) {
    result = result.filter(m => m.format === filters.format);
  }

  if (filters.state) {
    const st = filters.state.toLowerCase();
    result = result.filter(m => m.state && m.state.toLowerCase() === st);
  }

  if (filters.category) {
    const cat = filters.category.toLowerCase();
    result = result.filter(m =>
      m.category && m.category.toLowerCase().includes(cat)
    );
  }

  if (limit) {
    result = result.slice(0, limit);
  }

  container.innerHTML = '';
  const fragment = document.createDocumentFragment();

  result.forEach(movie => {
    fragment.appendChild(createMovieCard(movie));
  });

  container.appendChild(fragment);
}
