// public/javascripts/list-page.js
import { renderMovies } from './movie-cards.js';

document.addEventListener('DOMContentLoaded', () => {
  const container      = document.querySelector('.collection-body');
  const searchInput    = document.getElementById('search-input');
  const formatFilter   = document.getElementById('format-filter');
  const stateFilter    = document.getElementById('state-filter');
  const categoryFilter = document.getElementById('category-filter');
  const resultsCount   = document.getElementById('results-count');

  // elementos del modal
  const addMovieBtn    = document.getElementById('add-movie-btn');
  const modal          = document.getElementById('add-movie-modal');
  const closeBtn       = document.getElementById('close-add-movie');
  const form           = document.getElementById('add-movie-form');

  let allMovies = [];

  // Carga inicial de películas
  fetch('/api/my-movies')
    .then(res => res.json())
    .then(movies => {
      allMovies = movies;  
      applyFilters();
    })
    .catch(err => {
      console.error(err);
      resultsCount.textContent = 'Error cargando películas';
    });


  function applyFilters() {
    const filters = {
      text: searchInput.value.trim(),
      format: formatFilter.value || null,
      state: stateFilter.value || null,
      category: categoryFilter.value || null
    };

    renderMovies({
      movies: allMovies,
      container,
      limit: null,
      filters
    });

    const shown = container.querySelectorAll('.movie-card').length;
    resultsCount.textContent = `Mostrando ${shown} películas`;
  }

  // Eventos filtros existentes
  searchInput.addEventListener('input', applyFilters);
  formatFilter.addEventListener('change', applyFilters);
  stateFilter.addEventListener('change', applyFilters);
  categoryFilter.addEventListener('change', applyFilters);

  // ==== MODAL: abrir/cerrar ====
  if (addMovieBtn && modal && closeBtn && form) {
    const openModal = () => {
      modal.classList.remove('hidden');
    };

    const closeModal = () => {
      modal.classList.add('hidden');
      form.reset();
      const publicCheckbox = document.getElementById('movie-public');
      if (publicCheckbox) publicCheckbox.checked = true;
    };

    addMovieBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Cerrar clicando fuera del contenido
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // ==== Submit del formulario ====
  form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    title: form.title.value.trim(),
    year: Number(form.year.value),
    category: form.category.value,
    director: form.director.value.trim(),
    description: form.description.value.trim(),
    format: form.format.value,
    state: form.state.value,
    image: form.image.value.trim(),
    public: form.public.checked
  };

  try {
    const res = await fetch('/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Error en el servidor');

    const savedMovie = await res.json();

    allMovies.push(savedMovie);  // ya tiene ownerId correcto
    applyFilters();
    closeModal();
  } catch (err) {
    console.error(err);
    alert('Error al guardar la película');
  }
});


  }
});
