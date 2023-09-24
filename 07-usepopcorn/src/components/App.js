import { useState } from "react";
import { useLocalStorageState } from "../useLocalStorageState";
import { useMovies } from "../useMovies";
import { Box } from "./Box";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { Logo } from "./Logo";
import { Main } from "./Main";
import { MovieDetails } from "./MovieDetails";
import { MovieList } from "./MovieList";
import { Navbar } from "./Navbar";
import { NumResults } from "./NumResults";
import { Search } from "./Search";
import { WatchedMovieList } from "./WatchedMovieList";
import { WatchedSummary } from "./WatchedSummary";

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  };

  const handleAddWatched = (movie) => {
    setWatched((watchedMovies) => [...watchedMovies, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watchedMovies) =>
      watchedMovies.filter((movie) => movie.imdbID !== id)
    );
  };

  const { movies, error, isLoading } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watchedMovies");

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
              onCloseMovie={handleCloseMovie}
            />
          )}
          {!isLoading && error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              watched={watched.find(
                (watchedMovie) => watchedMovie.imdbID === selectedId
              )}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

export default App;
