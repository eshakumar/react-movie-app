import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com?apikey=1d7d51d1';

const movie1 = {
    "Title": "Life of Pi",
    "Year": "2012",
    "imdbID": "tt0454876",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNTg2OTY2ODg5OF5BMl5BanBnXkFtZTcwODM5MTYxOA@@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // async stands for asynchronous data, so it takes some time to get the data 
    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`); //back ticks and $ for string template
        const data  = await response.json();
        console.log(data);

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Marvel');
    }, []); //empty dependency array to only call the function at the start


    return (
        <div className="app">
            <h1>Movie Finder</h1>

            <div className="search">   
                <input 
                placeholder="Search for Movies"
                value={searchTerm}
                // e is the event
                onChange = {(e) => setSearchTerm(e.target.value)}
                />
                <img 
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>

            { movies?.length > 0 ? (
                <div className = "container">
                    {movies.map((movie) => (
                    <MovieCard movie = {movie} />
                    ))}
                </div>
            ) : (
                <div className = "empty">
                    <h2>No movies found</h2>
                </div>
            )}

        </div>
    );
};

export default App;