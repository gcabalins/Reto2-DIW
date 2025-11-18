fetch('data/collection.json')
  .then(response => response.json())
  .then(movies => {
    const container = document.querySelector('.collection-body');
    container.innerHTML = ""; 

    movies.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('movie-card');

      // Definir la estructura base
      card.innerHTML = `
        <div class="movie-image">
          <img src="${movie.image}" alt="${movie.title}">
          <div class="overlay">
            <p class="format-type"><i class="fa-solid fa-compact-disc"></i>${movie.format}</p>
          </div>
        </div>
        <div class="movie-info">
          <h2 class="movie-title">${movie.title}</h2>
          <div class="year-category">
            <span class="movie-year"><i class="fa-solid fa-calendar"></i>${movie.year}</span>
            <span class="movie-category">${movie.category}</span>
          </div>
          <p class="director"><i class="fa-regular  fa-user"></i>${movie.director}</p>
          <p class="description">${movie.description}</p>
          <div class="details-button">
            <button class="btn-view-details"><i class="fa-solid fa-eye"></i>Ver Detalles</button>
          </div>
        </div>
      `;

      // Crear el párrafo de estado dinámico
      const stateElement = document.createElement('p');
      stateElement.textContent = `Estado: ${movie.state}`;
      stateElement.classList.add('state');

      // Añadir clase según el valor
      switch (movie.state.toLowerCase()) {
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

      // Insertar dentro de .movie-info
      const movieInfo = card.querySelector('.movie-info');
      const detailsButton = movieInfo.querySelector('.details-button');
      movieInfo.insertBefore(stateElement, detailsButton);

      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error cargando collection.json:', error));
