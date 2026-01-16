const API_KEY = "thewdb"; // Demo OMDb API key
let moviesData = [];

function searchMovie() {
    const query = document.getElementById("searchInput").value.trim();
    const container = document.getElementById("movieContainer");

    if (query === "") {
        alert("Please enter a movie name");
        return;
    }

    container.innerHTML = "Loading...";

    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "False") {
                container.innerHTML = "<p>Movie not found</p>";
                return;
            }
            moviesData = data.Search;
            displayMovies(moviesData);
        });
}

function displayMovies(movies) {
    const container = document.getElementById("movieContainer");
    container.innerHTML = "";

    movies.forEach(movie => {
        fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(details => {
                const card = document.createElement("div");
                card.className = "movie-card";
                card.innerHTML = `
                    <img src="${details.Poster !== "N/A" ? details.Poster : ''}">
                    <h3>${details.Title}</h3>
                    <p><strong>Year:</strong> ${details.Year}</p>
                    <p><strong>Genre:</strong> ${details.Genre}</p>
                    <p><strong>Rating:</strong> ⭐ ${details.imdbRating}</p>
                    <p>${details.Plot}</p>
                `;
                container.appendChild(card);
            });
    });
}

function sortMovies() {
    const option = document.getElementById("sortOption").value;

    if (option === "year") {
        moviesData.sort((a, b) => b.Year - a.Year);
    }

    if (option === "rating") {
        moviesData.sort((a, b) => b.imdbRating - a.imdbRating);
    }

    displayMovies(moviesData);
}
