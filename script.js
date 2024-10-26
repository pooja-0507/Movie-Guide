const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// Function to fetch movie details using OMDb API
const getMovieInfo = async (movie) => {
    try{
    const myAPIkey = "6f5dc3a5";
    const url = `http://www.omdbapi.com/?apikey=${myAPIkey}&t=${movie}`;
    const response = await fetch(url);
    if(!response.ok)
    {
        throw new Error("unable to fatech movie data");
    }

    const data = await response.json();
    showMovieData(data);
    }

    catch(error)
    {
        showErrorMessage("No movie found!!");
    }
}

// Function to show movie data on the screen
const showMovieData = (data) => {
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    // Clear previous content
    movieContainer.innerHTML = ''; // Clear previous content
movieContainer.classList.remove('noBackground'); // Remove the class



    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating :&#11088 </strong> ${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });


    //creating movie poster
    const moviePosterElement= document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML=`<img src="${Poster}"/>`

    movieElement.appendChild(moviePosterElement);
    movieElement.appendChild(movieGenreElement);


    movieElement.innerHTML +=`<p><strong> Released Date:</strong> ${Released}</p>
    <p><strong>Duration: </strong> ${Runtime}</p>
    <p><strong>Cast: </strong> ${Actors}</p>
    <p><strong>Plot: </strong> ${Plot}</p>`;

    movieContainer.appendChild(movieElement);
}




const showErrorMessage=(message)=>{
    movieContainer.innerHTML=`<h2>${message}</h2>`
    movieContainer.classList.add('noBackground');
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') 
        getMovieInfo(movieName);
    else
    {
        showErrorMessage("Enter Movie name to get movie details");
    }
    
});
