const personalMovieDB = {
    privat: false,
    movies: {
        "The Shawshank Redemption": 9.3,
        "The Godfather": 9.2,
        "The Dark Knight": 9.0
    }
};

function displayMovies() {
    if (personalMovieDB.privat) {
        return;
    }

    const table = document.createElement("table");
    for (const movie in personalMovieDB.movies) {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = movie;
        cell2.textContent = personalMovieDB.movies[movie];
    }

    document.getElementById("movie-table").appendChild(table);
}

displayMovies();