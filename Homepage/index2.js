const API_KEY = "ea1deedf";
const OMDB_API_URL = "https://www.omdbapi.com/";
const TMBD_API = "975b939a3161871a56e25008a8154457";
const TMDB_API_URL = "https://api.themoviedb.org/3/search/person";

const tag1 = document.getElementById("popular");
const tag = document.createElement("h2");
tag.classList.add("trendy");
tag1.prepend(tag);

const detailsContainer = document.getElementById("movieDetailsContainer");
detailsContainer.style.display = "none";

document.getElementById("toggle").addEventListener("change", function () {
  const toggleballleft = document.querySelector(".left");
  const toggleballright = document.querySelector(".right");

  if (this.checked) {
    toggleballleft.classList.remove("active_1");
    toggleballright.classList.add("active");
    popularweek();
  } else {
    toggleballleft.classList.add("active_1");
    toggleballright.classList.remove("active");
    popularday();
  }
});

const popularweek = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzViOTM5YTMxNjE4NzFhNTZlMjUwMDhhODE1NDQ1NyIsInN1YiI6IjY1Njc4ODA3YThiMmNhMDEwYmMxZDcxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oB9zFv6FGu2D0Lz30OIVR7zSQtnbQhaXoFFtf6w5Dfs",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.results && response.results.length > 0) {
        tag.textContent = "";
        tag.textContent = "Trending movies this week in UK";

        displayResults(response.results);
      } else {
        const moviesContainer = document.getElementById("movieContainer");
        moviesContainer.innerHTML = "No_results_found.";
      }
    });
};

const popularday = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzViOTM5YTMxNjE4NzFhNTZlMjUwMDhhODE1NDQ1NyIsInN1YiI6IjY1Njc4ODA3YThiMmNhMDEwYmMxZDcxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oB9zFv6FGu2D0Lz30OIVR7zSQtnbQhaXoFFtf6w5Dfs",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.results && response.results.length > 0) {
        tag.textContent = "Trending movies this day in UK";

        displayResults(response.results);
      } else {
        const moviesContainer = document.getElementById("movieContainer");
        moviesContainer.innerHTML = "No_results_found.";
      }
    });
};

popularday();

const brandLink = document.getElementById("brandLink");
brandLink.addEventListener("click", (event) => {
  event.preventDefault();
  location.reload();
});

searchButton.addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value.trim();
  const selectedFilter = document.getElementById("searchFilter").value;
  const selectedType = document.getElementById("typeFilter").value;
  const selectedYear = document.getElementById("yearFilter").value;

  detailsContainer.style.display = "none";

  if (searchInput !== "") {
    if (selectedFilter === "cast") {
      searchByCast(searchInput);
    } else {
      searchMovies(searchInput, selectedType, selectedYear);
    }
  }
});

searchFilter.addEventListener("change", () => {
  const selectedFilter = document.getElementById("searchFilter").value;
  const selectedType = document.getElementById("typeFilter").value;
  const selectedYear = document.getElementById("yearFilter").value;
  const searchInput = document.getElementById("searchInput").value.trim();

  detailsContainer.style.display = "none";

  if (searchInput !== "") {
    if (selectedFilter === "cast") {
      searchByCast(searchInput);
    } else {
      searchMovies(searchInput, selectedType, selectedYear);
    }
  }
});

yearFilter.addEventListener("change", () => {
  const selectedType = document.getElementById("typeFilter").value;
  const selectedYear = document.getElementById("yearFilter").value;
  const searchInput = document.getElementById("searchInput").value.trim();

  detailsContainer.style.display = "none";

  searchMovies(searchInput, selectedType, selectedYear);
});

typeFilter.addEventListener("change", () => {
  const selectedType = document.getElementById("typeFilter").value;
  const selectedYear = document.getElementById("yearFilter").value;
  const searchInput = document.getElementById("searchInput").value.trim();

  detailsContainer.style.display = "none";

  searchMovies(searchInput, selectedType, selectedYear);
});

function searchMovies(title, type, year) {
  tag.textContent = "";

  let apiUrl = `${OMDB_API_URL}?apikey=${API_KEY}&s=${title}&page=1`;

  if (type) {
    apiUrl += `&type=${type}`;
  }
  if (year) {
    apiUrl += `&y=${year}`;
  }

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.Search && data.Search.length > 0) {
        displaySearchResults(data.Search);
      } else {
        const moviesContainer = document.getElementById("movieContainer");
        moviesContainer.innerHTML = "No results found.";
      }
    });
}

function displayResults(results) {
  const moviesContainer = document.getElementById("movieContainer");
  moviesContainer.innerHTML = "";

  results.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const moviePoster = document.createElement("img");
    moviePoster.classList.add("movie-poster");
    moviePoster.src =
      movie.Poster !== "N/A"
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "placeholder.jpg";
    moviePoster.alt = movie.Title + " Poster";
    movieCard.appendChild(moviePoster);

    const title = document.createElement("h2");
    title.classList.add("movie-title");
    title.textContent = movie.title;
    movieCard.appendChild(title);

    const releaseDate = document.createElement("p");
    releaseDate.classList.add("movie-release");
    releaseDate.textContent = `Release Date: ${movie.release_date}`;
    movieCard.appendChild(releaseDate);

    movieCard.addEventListener("click", () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzViOTM5YTMxNjE4NzFhNTZlMjUwMDhhODE1NDQ1NyIsInN1YiI6IjY1Njc4ODA3YThiMmNhMDEwYmMxZDcxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oB9zFv6FGu2D0Lz30OIVR7zSQtnbQhaXoFFtf6w5Dfs",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          const imbd = response.imdb_id;
          return fetch(`${OMDB_API_URL}?apikey=${API_KEY}&i=${imbd}`);
        })
        .then((response) => response.json())
        .then((movieDetails) => {
          showDetails(movieDetails);
        });
    });

    moviesContainer.appendChild(movieCard);
  });
}

function displaySearchResults(results) {
  const moviesContainer = document.getElementById("movieContainer");
  moviesContainer.innerHTML = "";

  results.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const moviePoster = document.createElement("img");
    moviePoster.classList.add("movie-poster");
    moviePoster.src = movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg";
    moviePoster.alt = movie.Title + " Poster";
    movieCard.appendChild(moviePoster);

    const title = document.createElement("h2");
    title.classList.add("movie-title");
    title.textContent = movie.Title;
    movieCard.appendChild(title);

    const releaseDate = document.createElement("p");
    releaseDate.classList.add("movie-release");
    releaseDate.textContent = `Release Date: ${movie.Year}`;
    movieCard.appendChild(releaseDate);

    movieCard.addEventListener("click", () => {
      fetch(`${OMDB_API_URL}?apikey=${API_KEY}&i=${movie.imdbID}`)
        .then((response) => response.json())
        .then((movieDetails) => {
          showDetails(movieDetails);
        });
    });

    moviesContainer.appendChild(movieCard);
  });
}

function showDetails(movieDetails) {
  const detailsContainer = document.getElementById("movieDetailsContainer");
  detailsContainer.style.display = "inherit";

  detailsContainer.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img src="${movieDetails.Poster}" alt="${
    movieDetails.Title
  } Poster" class="movie-poster">
            </div>
            <div class="col-md-8">
                <h2>${movieDetails.Title}</h2>
                <p><strong>Plot:</strong> ${movieDetails.Plot}</p>
                <p><strong>Actors:</strong> ${movieDetails.Actors}</p>
                <p><strong>Ratings:</strong> ${movieDetails.Ratings.map(
                  (rating) => `${rating.Source}: ${rating.Value}`
                ).join(", ")}</p>
                <p><strong>Awards:</strong> ${movieDetails.Awards}</p>
                <p><strong>Writer:</strong> ${movieDetails.Writer}</p>
                <p><strong>Director:</strong> ${movieDetails.Director}</p>
                <p><strong>Production:</strong> ${movieDetails.Production}</p>
            </div>
        </div>

        <div class="icon-container">
            <i class="fa fa-heart-o icon" id="like"></i>
        </div>
`;
}

function searchByCast(castName) {
  tag.textContent = "";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzViOTM5YTMxNjE4NzFhNTZlMjUwMDhhODE1NDQ1NyIsInN1YiI6IjY1Njc4ODA3YThiMmNhMDEwYmMxZDcxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oB9zFv6FGu2D0Lz30OIVR7zSQtnbQhaXoFFtf6w5Dfs",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/search/person?query=${castName}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.results && data.results.length > 0) {
        displaySearchResults(data.results);
      } else {
        const moviesContainer = document.getElementById("movieContainer");
        moviesContainer.innerHTML = "No results.";
      }
    });

  function displaySearchResults(results) {
    const moviesContainer = document.getElementById("movieContainer");
    moviesContainer.innerHTML = "";

    let known = results[0].known_for;

    known.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      const moviePoster = document.createElement("img");
      moviePoster.classList.add("movie-poster");
      moviePoster.src =
        movie.Poster !== "N/A"
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "placeholder.jpg";
      moviePoster.alt = movie.Title + " Poster";
      movieCard.appendChild(moviePoster);

      const title = document.createElement("h2");
      title.classList.add("movie-title");
      title.textContent = movie.title;
      movieCard.appendChild(title);

      const releaseDate = document.createElement("p");
      releaseDate.classList.add("movie-release");
      releaseDate.textContent = `Release Date: ${movie.release_date}`;
      movieCard.appendChild(releaseDate);

      movieCard.addEventListener("click", () => {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzViOTM5YTMxNjE4NzFhNTZlMjUwMDhhODE1NDQ1NyIsInN1YiI6IjY1Njc4ODA3YThiMmNhMDEwYmMxZDcxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oB9zFv6FGu2D0Lz30OIVR7zSQtnbQhaXoFFtf6w5Dfs",
          },
        };

        fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            const imbd = response.imdb_id;
            return fetch(`${OMDB_API_URL}?apikey=${API_KEY}&i=${imbd}`);
          })
          .then((response) => response.json())
          .then((movieDetails) => {
            showDetails(movieDetails);
          });
      });

      moviesContainer.appendChild(movieCard);
    });
  }
}

var username = sessionStorage.getItem("username");
var usernamePlaceholder = document.getElementById("usernamePlaceholder");

if (usernamePlaceholder && username) {
  const user = username.replace(/^"|"$/g, ""); // ******** //

  usernamePlaceholder.innerHTML = `Welcome, ${user}`;
}

function like(event) {
  const likeIcon = event.target;
  if (likeIcon.classList.contains("fa-heart-o")) {
    likeIcon.classList.remove("fa-heart-o");
    likeIcon.classList.add("fa-heart");
  } else {
    likeIcon.classList.remove("fa-heart");
    likeIcon.classList.add("fa-heart-o");
  }
}

document
  .getElementById("movieDetailsContainer")
  .addEventListener("click", function (event) {
    if (event.target && event.target.id === "like") {
      like(event);
    }
  });

const dark = document.querySelector(".moonBtn");
const svgEl = document.getElementById("svg");
svgEl.removeAttribute("fill");

dark.addEventListener("click", function () {

  const isDarkMode = document.body.classList.contains("dark-mode");

  if (isDarkMode) {
    document.body.classList.remove("dark-mode");
    svgEl.removeAttribute("fill");
  } else {
    document.body.classList.add("dark-mode");
    svgEl.setAttribute("fill", "none");
  }
});



// <div class="icon-container">
//             <i class="fa fa-heart-o icon" id="like"></i>
//         </div>
