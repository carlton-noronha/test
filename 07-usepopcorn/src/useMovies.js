import { useEffect, useState } from "react";

const KEY = "e6d8c431";

export const useMovies = (query) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    const controller = new AbortController();
    const fetchMovie = async () => {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res?.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await res.json();
        if (data.Response !== "False") {
          setMovies(data.Search);
        } else {
          throw new Error(data.Error);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();

    return () => controller.abort();
  }, [query]);

  return { movies, error, isLoading };
};
