import { useEffect, useRef, useState } from "react";
import { StarRating } from "./StarRating";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { useKey } from "../useKey";

const KEY = "e6d8c431";

export const MovieDetails = ({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const countRef = useRef(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    imdbRating,
    Genre: genre,
    Actors: actors,
    Director: director,
  } = movie;

  useEffect(() => {
    if (userRating) {
      countRef.current += 1;
    }
  }, [userRating]);

  useEffect(() => {
    document.title = "Loading...";
    if (title) {
      document.title = `Movie | ${title}`;
    }

    if (error) {
      document.title = "Oops! Something went wrong";
    }

    return () => (document.title = "usePopcorn");
  }, [title, error]);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        if (!res?.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await res.json();
        if (data.Response !== "False") {
          setMovie(data);
        } else {
          throw new Error(data.Error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [selectedId]);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      poster,
      title,
      userRating,
      year,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(/\s+/gi).at(0)),
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useKey("Escape", onCloseMovie);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {watched ? (
                <p>You have already rated this movie {userRating}!</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={2}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={handleAdd}
                      disabled={watched}
                    >
                      Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>
              <strong>Starring: </strong>
              {actors}
            </p>
            <p>
              <strong>Directed by: </strong>
              {director}
            </p>
          </section>
        </>
      )}
    </div>
  );
};
