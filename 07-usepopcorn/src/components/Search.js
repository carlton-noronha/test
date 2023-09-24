import { useRef } from "react";
import { useKey } from "../useKey";

export const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  const callback = () => {
    if (document.activeElement === inputEl.current) {
      return;
    }
    inputEl.current.focus();
    setQuery("");
  };

  useKey("Enter", callback);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};
