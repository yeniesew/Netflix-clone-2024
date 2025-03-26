import React, {useState, useEffect} from 'react'
import axios from '../../../utils/axios';
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        (async () => {
            try {
                console.log(fetchUrl);
                const request = await axios.get(fetchUrl);
                console.log(request);
                setMovies(request.data.results);
            } catch (error) {
                console.log("error",error);
                
            }
        })();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name)
                .then(url => {
                    console.log(url);
                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log(urlParams);
                    console.log(urlParams.get("v"));
                    setTrailerUrl(urlParams.get("v"));
                })
        }
    }

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }        
  return (
    <div className="row">
        <h1>{title}</h1>
        <div className="row-posters">
            {movies?.map((movie, index) => (
                <img 
                    onClick={() => handleClick(movie)} 
                    
                    key={index} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.name}
                    className={`row-poster ${isLargeRow && 'row__posterLarge'}`}
                />
            ))}
        </div>
        <div style={{ padding: "40px" }}>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    </div>
  )
}

export default Row;